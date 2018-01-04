'use strict';

// Core node modules
const path = require('path');

// Third party libs
const express = require('express');
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

// Add logging before routes
app.use(logger);

// my routes
app.use(routes);

// start app
app.listen(3030, () => {
  logger.info(`Running server in ${process.env.NODE_ENV} mode!`);
  logger.info('Listening for requests on port 3030...');
});

module.export = app;