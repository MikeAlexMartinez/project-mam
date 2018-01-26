'use strict';

// Core node modules
const path = require('path');

// Third party libs
require('dotenv').config()
const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const secret = process.env.SECRET || '53cr3t';

// bring in connection
const mongoose = require('./controllers/db');
const db = mongoose.connection;

// Helpers
const { fileDate } = require('./helpers/dates');

// Logging
const logger = require('./winston');
logger('info','Started Logging module!');

// Load my routes
const routes = require('./routes');

// initiate express app
const app = express();

// instantiate helmet headers and protections
app.use(helmet());

// Cookie Parsing
app.use(cookieParser(secret, {}));

// tell express where templates are kept.
app.set('views', './views');
// set template engine to pug
app.set('view engine', 'pug');

// Set up session management with MongoDB and express-session
app.use(session({
  secret: secret,
  resave: true,
  saveUninitialized: false,
  // move storage out of RAM and into Mongo
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// This is where static files are served from
app.use(express.static(path.resolve(__dirname, 'public')));

// supports parsing of application/json type post data
app.use(bodyParser.json());
// supports parsing of application/x-www-form-urlendcoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// Express winston logger
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console({
      colorize: true,
    }),
    new winston.transports.File({
      filename: `logs/requests/${fileDate()}requests.log`,
    })
  ],
  meta: true,
  msg: 'HTTP {{req.method}} {{res.statusCode}} {{req.url}}',
  expressFormat: true, 
  colorize: true,
  skip: () => process.env.NODE_ENV === 'test',
}));

// my routes
app.use(routes);

// Express Winston Error logging after routes
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  console.log("Error");
  console.log(err);
  res.status(err.status || 500)
    .json({
      message: err.message,
      error: {}
    });
});

// start app
app.listen(3030, () => {
  logger('info',`Running server in ${process.env.NODE_ENV} mode!`);
  logger('info','Listening for requests on port 3030...');
});

module.export = app;