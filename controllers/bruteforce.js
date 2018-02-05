'use strict';

const ExpressBrute = require('express-brute');
const mongoose = require('mongoose');
const MongooseStore = require('express-brute-mongoose');
const BruteForceSchema = require('express-brute-mongoose/dist/schema');

// Create brute force protections in production
const bruteModel = mongoose.model('bruteforce', BruteForceSchema);
const store = new MongooseStore(bruteModel);
const bruteforce = new ExpressBrute(store);

module.exports = bruteforce;
