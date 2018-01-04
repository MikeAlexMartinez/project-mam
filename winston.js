'use strict';

const fs = require('fs');

const winston = require('winston');

const logDir = 'log';
const env = process.env.NODE_ENV || 'development';

// Create log directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toISOString();

const logger = winston.createLogger({
  transports: [
    // Colorize the output to the console
    new winston.transports.Console({ 
      timestamp: tsFormat, 
      colorize: true
    }),
    // Write to logfile
    new winston.transports.File({
      filename: `${logDir}/results.log`,
      timestamp: tsFormat,
      level: env === 'development' ? 'debug' : 'info'
    })
  ]
});

logger.level = process.env.LOG_LEVEL || 'debug';

logger.info('Hello log files!', {
  meta: {
    someKey: 'some-value'
  }
});
logger.warn('You\'ve been warned');
logger.debug('Hello world!');

module.exports = logger;
