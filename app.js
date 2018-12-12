const express = require('express');
// const createError = require('http-errors');
const fileUpload = require('express-fileupload');
const logger = require('morgan');

const apiRouter = require('./routes/file');

// var path = require('path');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use('/api', apiRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.send('error');
// });

module.exports = app;
