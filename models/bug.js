'use strict';

const db = require('../controllers/db');
const uuidv4 = require('uuid/v4');

const Schema = db.Schema;

const bugSchema = new Schema({
  _id: {type: String, default: uuidv4 },
  sender: { type: String, required: true},
  email: { type: String, required: true},
  bugDescription: { type: String, required: true},
  createdDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  open: { type: Boolean, default: false },
  read: { type: Boolean, default: false },
  source: String,
  ip: { type: String, required: true}
});

const Bug = db.model('Bug', bugSchema);

module.exports = Bug;