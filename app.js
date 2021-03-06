var express         = require('express');
var path            = require('path');
var favicon         = require('serve-favicon');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var mongoose        = require('mongoose');

var appRoutes             = require('./routes/app');
var poloniexRoutes        = require('./routes/poloniex');
var poloniexMarketRoutes  = require('./routes/poloniexmarket');
var bittrexRoutes         = require('./routes/bittrex');
var userRoutes           = require('./routes/user');
var adminRoutes           = require('./routes/admin');

var app = express();

/**
* connect to MongoDB
**/
const uristring = process.env.MONGODB_URI || 'mongodb://heroku_3j5k2gf4:3086spst1ba0gbrfgslerpmjlk@ds133162.mlab.com:33162/heroku_3j5k2gf4';
mongoose.connect(uristring, function (err, db) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/poloniex/market', poloniexMarketRoutes);
app.use('/poloniex', poloniexRoutes);
app.use('/bittrex', bittrexRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
