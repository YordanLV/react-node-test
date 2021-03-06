const cookieParser = require('cookie-parser')
const createError = require('http-errors')
const express = require('express')
const fs = require('fs')
const logger = require('morgan')
const path = require('path')
const readline = require('readline')
const cors = require('cors')

const utils = require('./utils')

const app = express()

app.use(cors())
app.options('http://localhost', cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.get('/logs', function (req, res) {
  const { page, page_size } = req.query
  
  const lineReader = readline.createInterface({
    input: fs.createReadStream(__dirname+'/file.log'),
  });

  let lineNumber = 0
  const linesArray = []
  const startLine = page * page_size
  const endLine = page * page_size + Number(page_size)

  lineReader.on('line', function(line) {
    if (lineNumber >= startLine && lineNumber < (endLine)) {
      linesArray.push(utils.logFormatter(line))
    }
    lineNumber++
  });
  
  res.setHeader('Content-Type', 'application/json')
  lineReader.on('close', function() {
    res.end(JSON.stringify(linesArray))
  });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
