var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cron = require('node-cron');

var Server = require('../models/server');
var Admin = require('../models/admin');
var User = require('../models/user');
var PoloniexHelper = require('./poloniexhelper.js');
var BittrexHelper = require('./bittrexhelper.js');

const oneYear = 1000*60*60*24*360;
const oneMinute = 1000*60;

// timers
var dayTimer = 60 * 60 * 24;
var threeHourTimer = new Date();
var oneDayTimer = new Date();
var oneWeekTimer = new Date();

/**
router.get('/updateServerParams', function (req, res, next) {
  var timer = 10; //seconds
  var server = new Server({
    numberOfUsers: 0,
    numberOfKeys: 0,
    numberOfActiveUsers: 0,
    updateTimer: timer * 1000
  });
  server.save(function(err, result){
    if (err){
      return res.status(500).json({
        title: 'An error occureed',
        error: err
      });
    }
    res.status(201).json({
      message: 'Server params created',
      obj: result
    });
  });
});
**/

router.get('/server', function(req, res, next){
  var decoded = jwt.decode(req.query.token);
  Server.findById('5947f25493bccd26fcaa138b', function(err, server){
    if (err){
      return res.status(500).json({
        title: 'An error occureed',
        error: err
      });
    }
    if (!server){
      return res.status(500).json({
        title: 'No Server Found',
        error: {message: 'Server not found'}
      });
    }
    if (decoded == null){
      var adminToken = 1;
    } else{
      var adminToken = decoded.admin;
    }

    Admin.findById(adminToken, function(err, admin){
      if (err){
        return res.status(500).json({
          title: 'An error occureed',
          error: err
        });
      }
      if(!admin){
        return res.status(500).json({
          title: 'An error occureed',
          error: {message: 'Must be logged in.'}
        });
      }
      return res.status(200).json({
        message: 'Connected to server',
        obj: server
      });
    });
  });
});

router.patch('/server/update/:time', function(req, res, next){
  Server.findById('5947f25493bccd26fcaa138b', function(err, server){
    if (err){
      return res.status(500).json({
        title: 'An error occureed',
        error: err
      });
    }
    if (!server){
      return res.status(500).json({
        title: 'No Server Found',
        error: {message: 'Server not found'}
      });
    }
    server.updateTimer = 2000;
    if (req.params.time >= 10){
      server.updateTimer = req.params.time;
    }
    server.save(function(err, result){
      if (err){
        return res.status(500).json({
          title: 'An error occureed',
          error: err
        });
      }
      res.status(200).json({
        message: 'Updated server',
        obj: result
      });
    });
  });
});

// run scheduled task
// task: update all poloniex and bittrex users rank (RG & URG)
// the task timer is set by admin


Server.findById('5947f25493bccd26fcaa138b', function(err, server){
  if (err){
    console.log('Error running schduled task: Cannot find server params from database.');
    return;
  }
  if (!server){
    console.log('Error running schduled task: Cannot find server from database.');
    return;
  }
  newAppTimer = '*/' + server.updateTimer + ' * * * * *';
  startNewCron(newAppTimer, server.updateTimer);
});

function startNewCron(appTimer, interval){
  var newScheduledTask;
  newScheduledTask = cron.schedule(appTimer, function(){
    console.log('appTimer: ' + appTimer)
    //start all schduled tasks
    updateAllRealizedGains(interval);
    Server.findById('5947f25493bccd26fcaa138b', function(err, server){
      if (err){
        console.log('Error running schduled task: Cannot find server params from database.');
        return;
      }
      if (!server){
        console.log('Error running schduled task: Cannot find server from database.');
        return;
      }
      currentAppTimer = '*/' + server.updateTimer + ' * * * * *';
      if (appTimer != currentAppTimer) {
        console.log('App timer was updated ..');
        stopCron(newScheduledTask);
        startNewCron(currentAppTimer);
        return;
      }
      server.lastSuccessfulUpdate = new Date();
      server.save(function(err, result){
        if (err){
          console.log('Error running schduled task: Cannot update server.');
          return;
        }
        console.log('Server update started successfully (Poloniex)');
      });
    });
  });

  newScheduledTask.start();
}

function stopCron(scheduledTask) {
  scheduledTask.stop();
}

// Update Poloniex & Bittrex realized gains (RG)
function updateAllRealizedGains(interval){
  console.log('task started: updating all users realized gains ...');
  User.find({}, function(err, users){
    var userMap = {};
    users.forEach(function(user){
      PoloniexHelper.updateTradeHistoryPoloniex(user);
      PoloniexHelper.updateUserRealizedGainsPoloniex(user, interval);
      BittrexHelper.updateTradeHistoryBittrex(user);
      BittrexHelper.updateUserRealizedGainsBittrex(user, interval); //TODO
      updateAllUsersRealizedGains(user, interval);
    });
  });
}

// Update Poloniex un-realized gains (URG)
function updateUnrealizedGains(){

}

function updateAllUsersRealizedGains(user, interval) {
  var newTotalRealizedGains = 0;
  if (typeof user.lastRealizedGainPoloniex != 'undefined' && isNumber(user.lastRealizedGainPoloniex)) {
    newTotalRealizedGains += user.lastRealizedGainPoloniex;
  }
  if (typeof user.lastRealizedGainBittrex != 'undefined' && isNumber(user.lastRealizedGainBittrex)) {
    newTotalRealizedGains += user.lastRealizedGainBittrex;
  }
  var newTotalRealizedGainsEntry = {
    value: newTotalRealizedGains,
    date: new Date()
  };
  if (user.totalRealizedGainsDaily.length == 0){
    user.totalRealizedGainsDaily = newTotalRealizedGainsEntry;
    user.totalRealizedGainsWeekly = newTotalRealizedGainsEntry;
    user.totalRealizedGainsMonthly = newTotalRealizedGainsEntry;
  } else {
    // push to daily list over 24 hour period BUT re-write every 24 hour
    if (dayTimer > 0 &&  user.totalRealizedGainsDaily.length < 2880) {
      user.totalRealizedGainsDaily.push(newTotalRealizedGainsEntry);
      dayTimer -= interval;
    } else {
      user.totalRealizedGainsDaily = newTotalRealizedGainsEntry;
      dayTimer = 60 * 60 * 24; // reset timer
    }
    // push to weekly gains every 3 hours
    var currentTime = new Date().getHours();
    if ((threeHourTimer.getHours() + 3) < currentTime) { // + 3 <
      threeHourTimer = new Date();
      if (user.totalRealizedGainsWeekly.length > 56) {
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
      oneWeekTimer = new Date();
      user.totalRealizedGainsMonthly.push(newTotalRealizedGainsEntry);
    }
  }
  user.save(function(err, result){
    if (err){
      console.log('error while updating user realized gains');
    } else {
      console.log('Total RG calculated: ' + newTotalRealizedGains);
    }
  });
}


function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

module.exports = router;
