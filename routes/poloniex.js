var express   = require('express');
var router    = express.Router();
var crypto = require("crypto");
var nonce = require('nonce')();
var plnx = require('plnx');

var User = require('../models/user');
var PoloniexHelper = require('./poloniexhelper.js');

const tradingURL = 'https://poloniex.com/tradingApi';
const publicURL = 'https://poloniex.com/public';

router.get('/', function(req, res, next){
  res.send('done');
});



/**
* functions & methods BEGIN
**/

module.exports = router;

function sign(key, str) {
    var hmac = crypto.createHmac("sha512", key);
    var signed = hmac.update(str).digest("hex");
    return signed
}

function getBalances(apiKey, apiSecret){
  // Poloniex API is sensitive to the parameter order
  var body_string = 'nonce=' + nonce()*10000 + '&command=returnBalances';
  var encrypted_sign = sign(apiSecret, body_string);
  var options = {
    method: 'POST',
    url: tradingURL,
    body: body_string,
    headers: {
      'Key': apiKey,
      'Sign': encrypted_sign,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return options;
}

function returnTradeHistory(apiKey, apiSecret){
  // Poloniex API is sensitive to the parameter order
  start = Math.round(((new Date()).getTime() - 1000*60*60*24*360) / 1000); //TODO: set time dynamically
  end = Math.round((new Date()).getTime() / 1000);
  console.log('start: ' + start);
  console.log('end: ' + end);
  var body_string = 'nonce=' + nonce()*10000 +
    '&currencyPair=all' +
    '&command=returnTradeHistory' +
    '&start=' + start +
    '&end=' + end;
  var encrypted_sign = sign(apiSecret, body_string);
  var options = {
    method: 'POST',
    url: tradingURL,
    body: body_string,
    headers: {
      'Key': apiKey,
      'Sign': encrypted_sign,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  return options;
}

/**
* functions & methods END
**/
