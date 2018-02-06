'use strict';

const logger = require('./winston');

process.env.NODE_ENV = 'production';

const app = require('./app');

app.listen(3030, () => {
  logger('info',`Running server in ${process.env.NODE_ENV} mode!`);
  logger('info','Listening for requests on port 3030...');
});

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  logger('error', 'unhandledRejection: ' + error.message);
});