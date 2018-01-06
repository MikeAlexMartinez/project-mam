'use strict';

const fs = require('fs');
const path = require('path');

const winston = require('winston');

const { fileDate, tsFormat } = require('./helpers/dates');

const logDir = path.resolve(__dirname,'logs');
const env = process.env.NODE_ENV || 'development';

const directories = [
  'errors',
  'requests',
  'general',
];

// Create logs directory
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

directories.forEach((v) => {
  // Create lower log directory if it doesn't exist
  if (!fs.existsSync(path.resolve(logDir, v))) {
    fs.mkdirSync(path.resolve(logDir, v));
  }
});

const consoleLogs = () => {
  return new winston.transports.Console({ 
    timestamp: tsFormat, 
    colorize: true
  });
};

const generalLogs = () => {
  // Write to logfile
  return new winston.transports.File({
    name: 'info-file',
    filename: `${logDir}/general/${fileDate()}all.log`,
    timestamp: tsFormat,
    level: env === 'development' ? 'debug' : 'info'
  });
};

const errorLogs = () => {
  // write errors to specific file
  return new winston.transports.File({
    name: 'error-file',
    filename: `${logDir}/errors/${fileDate()}errors.log`,
    timestamp: tsFormat,
    level: 'error'
  });
};

// set transports based on node environment
let transports;
if (process.env.NODE_ENV === 'test') {
  transports = [];
} else {
  transports = [
    consoleLogs(),
    generalLogs(),    
    errorLogs()
  ];
}

const logger = new (winston.Logger)({
  transports: transports
});


logger.level = process.env.LOG_LEVEL || 'debug';

logger.info('Application Starting Up');

module.exports = logger;
