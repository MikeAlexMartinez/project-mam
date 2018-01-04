'use strict';

const db = require('../controllers/db');
const uuidv4 = require('uuid/v4');

const Schema = db.Schema;

const subscriberSchema = new Schema({
  _id: {type: String, default: uuidv4() },
  source: String,
  email: {type: String, index: { unique: true }},
  createdDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
});

const Subscriber = db.model('Subscriber', subscriberSchema);

module.exports = Subscriber;