const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const book = require('./routes/book');
const auth = require('./routes/auth');
const app = express();
// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/book', book);
app.use('/api/auth', auth);

/*// catch 404 and forward to error handler
app.use(function(req, res, next) {
   console.log('SE VA A GENERAR EL ERROR');
   const err = new Error('Not Found');
   err.status = 404;
   next(err);
});

// restful api error handler
app.use(function(err, req, res, next) {
   console.log(err);
   if (req.app.get('env') !== 'development') {
      delete err.stack;
   }
   res.status(err.statusCode || 500).json(err);
});*/

module.exports = app;