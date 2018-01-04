'use strict';

const fs = require('fs');

const winston = require('winston');

const { fileDate, tsFormat } = require('./helpers/dates');

const logDir = 'logs';
const env = process.env.NODE_ENV || 'development';

const directories = [
  '/errors',
  '/requests',
  '/general',
];

directories.forEach((v) => {
  // Create log directory if it doesn't exist
  if (!fs.existsSync(logDir + v)) {
    fs.mkdirSync(logDir + v);
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

module.exports = logger;
