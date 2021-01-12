var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var validator = require('express-validator');

// mongo db connection
/*
mongoose.connect("mongodb://localhost:27017/a1-tech", { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  console.log('MongoDB database connected and run on port 3006');
});
db = mongoose.connection;
*/

//---for API--
var creditRouter = require('./routes/api/v1/credit/index');
var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//app.use(validator());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(validator());

//---For API---
app.use('/api/v1/card', creditRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
