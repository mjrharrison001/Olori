var plnx = require('plnx');

var User = require('../models/user');
var RealizedGains = require('./realizedgains');

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

  updateTradeHistoryPoloniex: function updateTradeHistoryPoloniex(user) {
    if (typeof user.keysPoloniex != 'undefined' && user.keysPoloniex.length > 0){
      start = Math.round(((new Date()).getTime() - (9*oneYear)) / 1000);
      end = Math.round((new Date()).getTime() / 1000);
      plnx.returnTradeHistory({ key: user.keysPoloniex[0].public,
                                secret: user.keysPoloniex[0].private,
                                currencyPair: "all",
                                start: start,
                                end: end }, function(err, tradeHistory) {
        if (err){
          console.log('error while updating a trade history (Poloniex): ' + err);
          return;
        }
        user.tradeHistoryPoloniex = tradeHistory;
        user.save(function(err, result){
          if (err){
            console.log('error saving while updating users trade history');
          } else {
            console.log('success updating users trade history (Poloniex): ' + result.email);
          }
        });
      });
    }
  },

  calculateCurrentRealizedGainsPoloniex: function calculateCurrentRealizedGainsPoloniex(tradeHistory) {

    return totalRealizedGains;
  },

  updateUserRealizedGainsPoloniex: function updateUserRealizedGainsPoloniex(user, interval){
    var newTotalRealizedGains = 0;
    // calculate realized gains
    if (typeof user.tradeHistoryPoloniex != 'undefined') {
      newTotalRealizedGains = RealizedGains.calculateRealizedGains(user.tradeHistoryPoloniex);
    } else {
      newTotalRealizedGains = 0;
    }
    user.lastRealizedGainPoloniex = newTotalRealizedGains;
    // console.log(user.totalRealizedGainsDaily);
    // console.log('*');
    // console.log(user.totalRealizedGainsWeekly);
    // console.log('*');
    // console.log(user.totalRealizedGainsMonthly);
    user.save(function(err, result){
      if (err){
        console.log('error saving user while updating a users Realized Gains.');
      } else {
        console.log('success, ' + result.email + ' RG(POLO): ' + user.lastRealizedGainPoloniex);
      }
      });
  }

};
