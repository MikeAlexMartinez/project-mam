'use strict';

// Core node modules
const path = require('path');

// Third party libs
const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
const bodyParser = require('body-parser');

// Logging
const logger = require('./winston');
logger.info('Started Logging module!');

// Load my routes
const routes = require('./routes');

// initiate express app
const app = express();

// tell express where templates are kept.
app.set('views', './views');
// set template engine to pug
app.set('view engine', 'pug');

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
      colorize: true
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{res.statusCode}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
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

// start app
app.listen(3030, () => {
  logger.info(`Running server in ${process.env.NODE_ENV} mode!`);
  logger.info('Listening for requests on port 3030...');
});

module.export = app;