var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require('hbs')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var createRouter = require('./routes/create');
var editRouter = require('./routes/edit');
var deleteRouter = require('./routes/delete');
var listRouter = require('./routes/list');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './templates/views'));
app.set('view engine', 'hbs');

const partialsPath = path.join(__dirname, './templates/partials')
hbs.registerPartials(partialsPath)

const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createproduct', createRouter);
app.use('/editproduct', editRouter);
app.use('/deleteproduct', deleteRouter);
app.use('/listproduct', listRouter);

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

//module.exports = app;
app.listen(3000)

console.log("server listening on port 3000")