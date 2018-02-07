'use strict';

const fs = require('fs');
const https = require('https');
const logger = require('./winston');

process.env.NODE_ENV = 'production';

const app = require('./app');

const sslOptions = {
  cert: fs.readFileSync('./certs/fullchain.pem', 'utf8'),
  key: fs.readFileSync('./certs/privkey.pem', 'utf8')
};

https.createServer(sslOptions, app).listen(8080, () => {
  logger('info', 'server started at port 8080');
});

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  logger('error', 'unhandledRejection: ' + error.message);
});