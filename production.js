'use strict';

const logger = require('./winston');

process.env.NODE_ENV = 'production';

const app = require('./app');

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  logger('error', 'unhandledRejection: ' + error.message);
});