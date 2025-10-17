var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//Perbaikan ke 2
var indexRouter = require('./app_toko_online/routes/index');
var usersRouter = require('./app_toko_online/routes/users');
var productRouter = require("./app_toko_online/routes/product"); //letakkan di atas agar rapi
var engine = require('ejs-blocks'); //menggunakan ejs block
var app = express();
var apiProductRouter = require("./app_toko_online/routes/api/product");
require('../toko-online/app_toko_online/models/db')

// view engine setup
app.set('views', path.join(__dirname, 'app_toko_online', 'views')); //perbaikan 1
app.engine('ejs', engine);  //daftarkan engine ejs block
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//serving bootstrap
app.use('/bootstrap', express.static(path.join(__dirname,'node_modules/bootstrap/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/produk", productRouter);

app.use("api/produk", apiProductRouter); 
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
 
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
