'use strict';

process.env.NODE_ENV = 'development';

const app = require('./app');

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('unhandledRejection', error.message);
});
