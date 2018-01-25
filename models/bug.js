'use strict';

const db = require('../controllers/db');
const uuidv4 = require('uuid/v4');

const Schema = db.Schema;

const bugSchema = new Schema({
  _id: {type: String, default: uuidv4 },
  sender: String,
  email: String,
  bugDescription: String,
  createdDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  source: String
});

const Bug = db.model('Bug', bugSchema);

module.exports = Bug;