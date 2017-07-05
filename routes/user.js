var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var plnx = require('plnx');

var User = require('../models/user');
var PoloniexHelper = require('./poloniexhelper.js');

router.post('/', function (req, res, next) {
  var user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  if (typeof req.body.keysPoloniex != 'undefined'){
    user.keysPoloniex = req.body.keysPoloniex;
  }
  if (typeof req.body.keysBittrex != 'undefined'){
    user.keysBittrex = req.body.keysBittrex;
  }
  if (typeof req.body.totalRealizedGains != 'undefined'){
    user.totalRealizedGains.value = req.body.totalRealizedGains.value;
  }
  if (typeof req.body.totalUnrealizedGains != 'undefined'){
    user.totalUnrealizedGains.value = req.body.totalUnrealizedGains.value;
  }
  if (typeof req.body.tradeHistory != 'undefined'){
    user.tradeHistory = req.body.tradeHistory;
  }
  if (typeof user.keysPoloniex != 'undefined'){
    PoloniexHelper.updateUserRealizedGainsPoloniex(user, 0, res);
  }
  else {
    user.save(function(err, result){
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
    });
  }
});

router.post('/signin', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user){
    if (err){
      return res.status(500).json({
        title: 'An error occureed',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    var token = jwt.sign({user: user}, 'changeme123', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      userId: user._id
    });
  });
});

module.exports = router;
