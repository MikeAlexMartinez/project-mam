'use strict';

const mongoose = require('mongoose');

const logger = require('../winston');

const dbURL = 'mongodb://localhost:27017/project-mam';

const options = {
  useMongoClient: true,
};

mongoose.Promise = global.Promise;
  
mongoose.connect(dbURL, options);

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection is open to ${dbURL}`);
});

mongoose.connection.on('error', function(err){
  logger.error(`Mongoose default connection error has occured ${err} error`);
});

mongoose.connection.on('disconnected', function(){
  logger.info(`Mongoose default connection is disconnected`);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    logger.info(`Mongoose default connection is disconnected due to application termination`);
    process.exit(0);
  });
});

module.exports = mongoose;