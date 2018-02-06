'use strict';

const fs = require('fs');
const https = require('https');

process.env.NODE_ENV = 'development';

const app = require('./app');

const sslOptions = {
  key: fs.readFileSync('./certs/key.pem', 'utf8'),
  cert: fs.readFileSync('./certs/server.crt', 'utf8')
};

https.createServer(sslOptions, app).listen(3030, () => {
  console.log('server started at port 3030');
});

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.error('unhandledRejection', error.message);
});
