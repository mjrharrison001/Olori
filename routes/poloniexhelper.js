var plnx = require('plnx');

var User = require('../models/user');

const oneYear = 1000*60*60*24*360;
const oneMinute = 1000*60;

// timers
var dayTimer = 60 * 60 * 24;
var threeHourTimer = new Date();
var oneDayTimer = new Date();
var oneWeekTimer = new Date();

// functions made available outside class:
// updateUserRealizedGains(user)
// calculateCurrentRealizedGains(tradeHistory)
var localRef = module.exports = {

  updateUserRealizedGainsPoloniex: function updateUserRealizedGainsPoloniex(user, interval, res) {
    if (typeof user.keysPoloniex != 'undefined'){
      start = Math.round(((new Date()).getTime() - (9*oneYear)) / 1000);
      end = Math.round((new Date()).getTime() / 1000);
      plnx.returnTradeHistory({ key: user.keysPoloniex[0].public,
                                secret: user.keysPoloniex[0].private,
                                currencyPair: "all",
                                start: start,
                                end: end }, function(err, tradeHistory) {
        if (err){
          console.log('error while updating a users Realized Gains: ' + err);
          return;
        }

        // calculate realized gains
        var newTotalRealizedGains = localRef.calculateCurrentRealizedGainsPoloniex(tradeHistory);

        var newTotalRealizedGainsEntry = {
          value: newTotalRealizedGains,
          date: new Date()
        };

        // save updated trade history
        if (typeof user.totalRealizedGainsDaily == 'undefined'){
          user.totalRealizedGainsDaily = newTotalRealizedGainsEntry;
          user.totalRealizedGainsWeekly = newTotalRealizedGainsEntry;
          user.totalRealizedGainsMonthly = newTotalRealizedGainsEntry;
        } else {
          // push to daily list over 24 hour period BUT re-write every 24 hour
          if (dayTimer > 0) {
            user.totalRealizedGainsDaily.push(newTotalRealizedGainsEntry);
            dayTimer -= interval;
          } else {
            user.totalRealizedGainsDaily = newTotalRealizedGainsEntry;
            dayTimer = 60 * 60 * 24; // reset timer
          }

          // push to weekly gains every 3 hours
          var currentTime = new Date().getHours();
          if ((threeHourTimer.getHours() + 3) < currentTime) {
            threeHourTimer = currentTime;
            if (user.totalRealizedGainsWeekly.length > 2) {
              // remove the oldest element
              // only keep 1 week of database
              user.totalRealizedGainsWeekly.shift();
              user.totalRealizedGainsWeekly.push(newTotalRealizedGainsEntry);
            } else {
              user.totalRealizedGainsWeekly.push(newTotalRealizedGainsEntry);
            }
          }

          // push to monthly gains every 24 hours
          if ((oneWeekTimer.getHours() + 24) < currentTime) {
            oneWeekTimer = currentTime;
            user.totalRealizedGainsMonthly.push(newTotalRealizedGainsEntry);
          }

          console.log('dayTimer = ' + dayTimer);
          console.log('RG daily: ');
          console.log('currentTime: ' + currentTime);
          console.log('threeHourTimer: ' + (threeHourTimer.getHours()+3));
          console.log('oneWeekTimer: ' + (oneWeekTimer.getHours()+24));
          console.log(user.totalRealizedGainsDaily);
          console.log('*');
          console.log(user.totalRealizedGainsWeekly);
          console.log('*');
          console.log(user.totalRealizedGainsMonthly);

          // push to monthly gains every 24 hours
        }
        user.tradeHistoryPoloniex = tradeHistory;
        user.save(function(err, result){
          // POST request: send back a response
          if (typeof res != 'undefined') {
            if (err){
              return res.status(500).json({
                title: 'An error occureed',
                error: err
              });
            }
            res.status(201).json({
              message: 'User created',
              obj: result
            });
          }
          // just an update: do not send back a response
          else{
            if (err){
              console.log('error saving user while updating a users Realized Gains.');
            } else {
              console.log('success, ' + result.email + ' RG: ' + newTotalRealizedGains);
            }
          }
        });
      });
    }
  },

  calculateCurrentRealizedGainsPoloniex: function calculateCurrentRealizedGainsPoloniex(tradeHistory) {
    var t = tradeHistory;
    var totalRealizedGains = 0;

    for (var key in t) {
      if (t.hasOwnProperty(key)) {

        var tokenRealizedGains = 0;
        var buy_amount = [];
        var sell_amount = [];
        var buy_rate = [];
        var sell_rate = [];
        var buy_total = 0;
        var sell_total = 0;

        for (var i = 0; i < t[key].length; i++) {
          if (t[key][i].type == 'buy'){
            var buy_amount_ref = parseInt(t[key][i].amount);
            buy_amount.push(buy_amount_ref);
            buy_rate.push(parseFloat(t[key][i].rate));
            buy_total += buy_amount_ref;
          }
          if (t[key][i].type == 'sell'){
            var sell_amount_ref = parseInt(t[key][i].amount);
            sell_amount.push(sell_amount_ref);
            sell_rate.push(parseFloat(t[key][i].rate));
            sell_total += sell_amount_ref;
          }
        }
        /**
        * exchange type transactions
        * BEGIN
        **/
        var buy_ave_price = [];
        var sell_ave_price = [];
        var buy_total_price = 0;
        var sell_total_price = 0;
        for (var i = 0; i < buy_amount.length; i++) {
          if ( buy_total != 0 ) {
            buy_ave_price.push(buy_rate[i] * ( buy_amount[i] / buy_total ));
          }
        }
        for (var i = 0; i < sell_amount.length; i++) {
          if ( sell_total != 0 ) {
            sell_ave_price.push(sell_rate[i] * ( sell_amount[i] / sell_total ));
          }
        }
        // sum of buy_ave_price/sell_ave_price
        buy_total_price = buy_ave_price.reduce((a, b) => a + b, 0);
        sell_total_price = sell_ave_price.reduce((a, b) => a + b, 0);
        //console.log(sell_total_price);
        //console.log(buy_total_price);
        if (buy_total >= sell_total && buy_total_price > 0 && sell_total > 0){
          tokenRealizedGains = ((sell_total_price / buy_total_price) - 1) * 100;
        } else {
          tokenRealizedGains = 0;
        }
        totalRealizedGains += tokenRealizedGains;
      }
    }
    console.log('Users total realized gains: ' + totalRealizedGains);
    return totalRealizedGains;
  }

};
