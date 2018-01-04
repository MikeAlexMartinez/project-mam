'use strict';

process.env.NODE_ENV = 'development';

const app = require('./app');

console.log('starting app in DEVELOPMENT mode!');

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message);
});
