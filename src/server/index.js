require('../../build/check-versions')()
var config = require('../../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var opn = require('opn')
var path = require('path')
var express = require('express')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var webpack = require('webpack')
var webpackConfig = require('../../build/webpack.dev.conf')

// var api = require('../server/config/api')

var port = process.env.PORT || config.dev.port

var autoOpenBrowser = !!config.dev.autoOpenBrowser

var app = express()
var compiler = webpack(webpackConfig)
app.use(require('connect-history-api-fallback')())
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: '/',
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

app.use(devMiddleware)
app.use(hotMiddleware)

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

app.use(express.static(path.join(__dirname, 'index/')))
// app.use('/', api)

app.get('/', (req, res) => {
  res.sendFile('./index/index.html')
})
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
