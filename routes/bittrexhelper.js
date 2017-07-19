var bittrex = require('node.bittrex.api');

var RealizedGains = require('./realizedgains');

var localRef = module.exports = {

  updateTradeHistoryBittrex: function updateTradeHistoryBittrex(user) {
    if (typeof user.keysBittrex != 'undefined' && user.keysBittrex.length > 0){
      bittrex.options({
        'apikey' : user.keysBittrex[0].public,
        'apisecret' : user.keysBittrex[0].private,
        'stream' : false, // will be removed from future versions
        'verbose' : true,
        'cleartext' : false
      });
      bittrex.getorderhistory({},function( tradeHistory ) {
        //console.log( tradeHistory );

        user.tradeHistoryBittrex = tradeHistory;
        user.save(function(err, result){
          if (err){
            console.log('error saving user while updating a users trade history (Bittrex).');
          } else {
            console.log('success updating users trade history (Bittrex), ' + result.email);
          }
        });
      });
    }
  },

  calculateCurrentRealizedGainsBittrex: function calculateCurrentRealizedGainsBittrex(tradeHistory) {
    var convertedTradeHistory = {};
    var t;
    if (typeof tradeHistory.result != 'undefined'){
      t = tradeHistory.result;
    } else {
      t = [''];
    }
    for (var i = 0; i < t.length; i++) {
      // already has that exhange
      var type = '';
      var amount = 0;
      if (convertedTradeHistory.hasOwnProperty(t[i].Exchange)) {
        if (t[i].OrderType == 'LIMIT_BUY') {
          type = 'buy';
        }
        if (t[i].OrderType == 'LIMIT_SELL') {
          type = 'sell';
        }
        if (t[i].Quantity > t[i].QuantityRemaining) {
          amount = t[i].Quantity - t[i].QuantityRemaining;
        }
        convertedTradeHistory[t[i].Exchange].push({
          type: type,
          rate: t[i].PricePerUnit,
          amount: amount,
          date:  t[i].TimeStamp
        })
      } else {
        if (t[i].OrderType == 'LIMIT_BUY') {
          type = 'buy';
        }
        if (t[i].OrderType == 'LIMIT_SELL') {
          type = 'sell';
        }
        if (t[i].Quantity > t[i].QuantityRemaining) {
          amount = t[i].Quantity - t[i].QuantityRemaining;
        }
        convertedTradeHistory[t[i].Exchange] = [{
          type: type,
          rate: t[i].PricePerUnit,
          amount: amount,
          date:  t[i].TimeStamp
        }];
      }
    }
    totalRealizedGains = RealizedGains.calculateRealizedGains(convertedTradeHistory);
    return totalRealizedGains;
  },

  updateUserRealizedGainsBittrex: function updateUserRealizedGainsBittrex(user, interval){
    var newTotalRealizedGains = 0;
    // calculate realized gains
    if (typeof user.tradeHistoryBittrex != 'undefined') {
      newTotalRealizedGains = localRef.calculateCurrentRealizedGainsBittrex(user.tradeHistoryBittrex);
    } else {
      newTotalRealizedGains = 0;
    }
    user.lastRealizedGainBittrex = newTotalRealizedGains;
    // console.log(user.totalRealizedGainsDaily);
    // console.log('*');
    // console.log(user.totalRealizedGainsWeekly);
    // console.log('*');
    // console.log(user.totalRealizedGainsMonthly);
    user.save(function(err, result){
      if (err){
        console.log('error saving user while updating a users Realized Gains.');
      } else {
        console.log('success, ' + result.email + ' RG(BITTREX): ' + user.lastRealizedGainBittrex);
      }
      });
  }
}
