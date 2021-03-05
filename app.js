const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const fs = require('fs');
const readline = require('readline');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

async function processLineByLine(page, page_size) {
  const lineReader = require('readline').createInterface({
  input: require('fs').createReadStream(__dirname+'/file.log'),
  });
  let lineCounter = page * page_size - page_size; 
  const wantedLines = [];
  lineReader.on('line', function (line) {
    lineCounter++;
    wantedLines.push(line);
    if(lineCounter==page * page_size){lineReader.close();}
  });
  lineReader.on('close', function() {
    console.log(wantedLines);
    //  process.exit(0);
  });
}

app.get('/logs', function (req, res) {
  const {page, page_size} = req.query;

  res.setHeader('Content-Type', 'application/json');
  processLineByLine(page, page_size);
  res.end(JSON.stringify({ a: 1 }, null, 3));
})

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
