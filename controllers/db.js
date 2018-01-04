'use strict';

const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/project-mam';

const options = {
  useMongoClient: true,
};

mongoose.Promise = global.Promise;
  
mongoose.connect(dbURL, options);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection is open to ${dbURL}`);
});

mongoose.connection.on('error', function(err){
  console.log(`Mongoose default connection error has occured ${err} error`);
});

mongoose.connection.on('disconnected', function(){
  console.log(`Mongoose default connection is disconnected`);
});

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.log(`Mongoose default connection is disconnected due to application termination`);
    process.exit(0);
  });
});

module.exports = mongoose;