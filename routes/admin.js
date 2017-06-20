var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Admin = require('../models/admin');

router.post('/', function (req, res, next) {
  return res.status(500).json({
    title: 'An error occureed: No longer creating admins',
    error: err
  });
});

router.post('/signin', function(req, res, next){
  Admin.findOne({email: req.body.email}, function(err, admin){
    if (err){
      return res.status(500).json({
        title: 'An error occureed',
        error: err
      });
    }
    if (!admin) {
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    if (!bcrypt.compareSync(req.body.password, admin.password)){
      return res.status(401).json({
        title: 'Login failed',
        error: {message: 'Invalid login credentials'}
      });
    }
    var token = jwt.sign({admin: admin}, 'changeme123', {expiresIn: 7200});
    res.status(200).json({
      message: 'Successfully logged in',
      token: token,
      adminId: admin._id
    });
  });
});

module.exports = router;
