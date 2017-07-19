var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var plnx = require('plnx');

var User = require('../models/user');
var PoloniexHelper = require('./poloniexhelper.js');
var BittrexHelper = require('./bittrexhelper.js');

router.get('/', function (req, res, next) {
  User.find().exec(function (err, users){
    res.setHeader('Content-Type', 'application/json');
    if (err) {
      return res.status(500).json({
          message: 'An error occureed',
          error: err
        });
    }
    res.status(200).json({
        message: 'Success',
        obj: users
      });
  });
});

router.post('/:id', function(req, res, next){
  var token = req.body.token || req.query.token || req.header['x-access-token'];
  jwt.verify(token, 'changeme123', function(err, decoded) {
    res.setHeader('Content-Type', 'application/json');
    if (err){
      return res.status(401).json({
        message: 'Not Authenticated',
        error: err
      });
    }
    User.findById(req.params.id, function(err, user){
      if (err) {
        return res.status(500).json({
          message: 'An error has occured',
          error: err
        });
      }
      if (!user) {
        return res.status(500).json({
          message: 'No user found',
          error: {message: 'No user found'}
        });
      }
      if (req.params.id != decoded.user._id) {
        return res.status(401).json({
          message: 'Not Authenticated',
          error: {message: 'Users do not match'}
        });
      }
      res.status(200).json({
        message: 'Success',
        obj: user.userName
      });
    });
  });
});

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
  user.save(function(err, result){
    res.setHeader('Content-Type', 'application/json');
    if (err){
      return res.status(500).json({
        message: 'An error occureed',
        error: err
      });
    }
    PoloniexHelper.updateTradeHistoryPoloniex(result, 0);
    BittrexHelper.updateTradeHistoryBittrex(result, 0);
    res.status(201).json({
      message: 'User created',
      obj: result
    });
  });
});

router.post('/signin', function(req, res, next){
  User.findOne({email: req.body.email}, function(err, user){
    res.setHeader('Content-Type', 'application/json');
    if (err){
      return res.status(500).json({
        message: 'An error occureed',
        error: err
      });
    }
    if (!user) {
      return res.status(401).json({
        message: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)){
      return res.status(401).json({
        message: 'Login failed',
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
