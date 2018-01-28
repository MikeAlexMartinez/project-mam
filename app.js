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
const csurf = require('csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const requestIp = require('request-ip');

const secret = process.env.SECRET || '53cr3t';

// bring in connection
const mongoose = require('./controllers/db');
const db = mongoose.connection;

// Helpers
const { fileDate } = require('./helpers/dates');

// Logging
const logger = require('./winston');
logger('info','Started Logging module!');

// Bring in mu auth items
const auth = require('./controllers/authentication/auth');

// Load my routes
const routes = require('./routes');

// initiate express app
const app = express();

// instantiate helmet headers and protections
app.use(helmet());

// Set Content Security policy to my server only
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", 'https://fonts.googleapis.com'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:']
  }
}));

// capture ip address
app.use(requestIp.mw());

app.use(auth.captureIp);

// Cookie Parsing
app.use(cookieParser(secret, {}));

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

// supports parsing of application/json type post data
app.use(bodyParser.json());
// supports parsing of application/x-www-form-urlendcoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// enable csurf - Needs to be after cookie parser and body parser
const csrfProtection = csurf({ cookies: true });
app.use(csrfProtection);
app.use(function(err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);
  res.status(403).json({"error": "session has expired or tampered with"});
});

// tell express where templates are kept.
app.set('views', './views');
// set template engine to pug
app.set('view engine', 'pug');

// This is where static files are served from
app.use(express.static(path.resolve(__dirname, 'public')));

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