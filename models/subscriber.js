'use strict';

const db = require('../controllers/db');

const Schema = db.Schema;

const subscriberSchema = new Schema({
  source: String,
  email: {type: String, index: { unique: true }},
  createdDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
});

const Subscriber = db.model('Subscriber', subscriberSchema);

module.exports = Subscriber;