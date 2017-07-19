var localRef = module.exports = {
  // returns the total realized gains for a specific exchange
  // Takes an unsorted tradeHistory
  // tradeHistory must have the fields:
  // type: 'buy' | 'sell';
  // rate: Number,
  // amount: Number
  // date: Date
  calculateRealizedGains: function calculateRealizedGains(tradeHistory) {
    var t = tradeHistory;
    var totalRealizedGains = 0;
    for (var key in t) {
      if (t.hasOwnProperty(key)) {
        // sort by date => from oldest to newest
        t[key].sort(date_sort);
        // loop through each transaction for this currency
        var sell_rate = [];
        var sell_amount = [];
        var buy_rate = [];
        var buy_amount = [];
        var total_current_buy_amount = 0;
        var balance = 0;
        var sellLast = false;
        for (var i = 0; i < t[key].length; i++) {
          if (t[key][i].type == 'buy') {
            var buyAmountRef = parseInt(t[key][i].amount);
            var buyRateRef = parseFloat(t[key][i].rate);
            balance += buyAmountRef;
            if (sellLast) {
              total_current_buy_amount = buyAmountRef;
              sellLast = false;
              buy_rate = [];
              buy_amount = [];
              buy_rate.push(buyRateRef);
              buy_amount.push(buyAmountRef);
            } else {
              total_current_buy_amount += buyAmountRef;
              buy_rate.push(buyRateRef);
              buy_amount.push(buyAmountRef);
            }
          }
          if (t[key][i].type == 'sell') {
            var sellAmountRef = parseInt(t[key][i].amount);
            var sellRateRef = parseFloat(t[key][i].rate);
            if (balance - sellAmountRef >= 0) {
              sellLast = true;
              sell_rate.push(sellRateRef);
              sell_amount.push(sellAmountRef);
              var ave_buy_rate = calculateAveBuyRate(buy_rate, buy_amount, total_current_buy_amount);

              balance -= sellAmountRef;
              // error checking
              var currentRG = 0;
              if (ave_buy_rate != 0 && total_current_buy_amount != 0) {
                currentRG = (((sellRateRef / ave_buy_rate) - 1) * (sellAmountRef / total_current_buy_amount)) * 100;
              }
              console.log(key + ' - ');
              console.log('%RG: ' + currentRG);
              totalRealizedGains += (currentRG);
            }
          }
        }
      }
    }
    return totalRealizedGains;
  }
};

function date_sort(a, b) {
  return new Date(a.date).getTime() - new Date(b.date).getTime()
}

function calculateAveBuyRate(buy_rate, buy_amount, total_current_buy_amount) {
  var ave_buy_rate = 0;
  for (var i = 0; i < buy_rate.length; i++) {
    ave_buy_rate += buy_rate[i] * (buy_amount[i] / total_current_buy_amount);
  }
  return ave_buy_rate;
}
