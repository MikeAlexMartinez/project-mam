'use strict';

const db = require('../controllers/db');
const uuidv4 = require('uuid/v4');

const Schema = db.Schema;

const IpSchema = new Schema({
  _id: {type: String, default: uuidv4 },
  ip: {type: String, unique: true, required: true},
  lastRequest: {type: Date, default: new Date},
  requestsToday: {type: Number, default: 0},
  type: Number,
  requestCount: {type: Number, default: 1}
});

const Ip = db.model('Ip', IpSchema);

module.exports = Ip;