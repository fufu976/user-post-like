//--------------------
//NPM modules
//--------------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var hbs  = require('hbs');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//--------------------
//Project Modules
//--------------------
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var likesRouter = require('./routes/likes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

// Routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/likes', likesRouter);

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
