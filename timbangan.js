var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var timbang = require('./routes/timbang');

// Ignat, 11112017
var serial1conn = require('./utils/Serial1Conn');
var serial2conn = require('./utils/Serial2Conn');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/timbang', timbang);
app.use('/api/v1', timbang);

// Ignat, 11112017, Open errors will be emitted as an error event
console.log("Initialize port 1")
if(serial1conn.isOpen)
{
  serial1conn.close(function (err)
  {
    if (err)
    {
      global.strResultCom1 = "err";
      return console.log('Closing port 1 error -> ', err.message);
    }

    // Because there's no callback to write, write errors will be emitted on the port:
    console.log("Closing port 1 success")
  });
}

serial1conn.open(function (err)
{
  if (err)
  {
    global.strResultCom1 = "err";
    return console.log('Opening port 1 error -> ', err.message);
  }

  // Because there's no callback to write, write errors will be emitted on the port:
  console.log("Opening port 1 success")
});

var strHasil='';

serial1conn.on('data', function (data)
{
  strHasil += data.toString().trim();

  if(data.toString().trim() === "+")
  {
//    console.log(strHasil.substr(0, 6));
    global.strResultCom1 = strHasil.substr(0, 6);
    strHasil = '';
  }
});

console.log("Initialize port 2")
if(serial2conn.isOpen)
{
  serial2conn.close(function (err)
  {
    if (err)
    {
      global.strResultCom2 = "err";
      return console.log('Closing port 2 error -> ', err.message);
    }

    // Because there's no callback to write, write errors will be emitted on the port:
    console.log("Closing port 2 success")
  });
}

serial2conn.open(function (err)
{
  if (err)
  {
    global.strResultCom2 = "err";
    return console.log('Opening port 2 error -> ', err.message);
  }

  // Because there's no callback to write, write errors will be emitted on the port:
  console.log("Opening port 2 success")
});

serial2conn.on('data', function (data)
{
  if(data.toString().trim() !== "=")
  {
    global.strResultCom2 = data.toString().trim();
    console.log(data.toString().trim());
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
