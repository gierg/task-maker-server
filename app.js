const express = require('express');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const oauthServer = require('oauth2-server');
const Request = oauthServer.Request;
const Response = oauthServer.Response;

let app = express();
dotenv.load({ path: '.env.example' });

const oauth = require('./components/oauth');

const index = require(path.join(__dirname, 'routes', 'index'));
const oauth3 = require(path.join(__dirname, 'routes', 'api', 'oauth'));
const tasks = require(path.join(__dirname, 'routes', 'api', 'tasks'));
const users = require(path.join(__dirname, 'routes', 'api', 'users'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/v1/oauth', oauth3);

app.use((req, res, next) => {
  const options = {};
  const request = new Request({
    headers: { authorization: req.headers.authorization },
    method: req.method,
    query: req.query,
    body: req.body
  });
  const response = new Response(res);

  oauth.authenticate(request, response, options)
    .then(function (token) {
      // Request is authorized.
      req.user = token;
      next();
    })
    .catch(function (err) {
      // Request is not authorized.
      res.status(err.code || 500).json(err);
    });
});

app.use('/api/v1/tasks', tasks);
app.use('/api/v1/users', users);

// catch 404 and forward to error handler
app.use((req, res) => {
  res.status(404).send({
    errors: [{
      status: 404,
      message: 'Page Not Found',
      code: 20001
    }]
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).send({
    errors: [{
      status: 500,
      message: 'Internal Server Error',
      code: 20002
    }]
  });
});

module.exports = app;
