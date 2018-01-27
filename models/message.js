'use strict';

const db = require('../controllers/db');
const uuidv4 = require('uuid/v4');

const Schema = db.Schema;

const messageSchema = new Schema({
  _id: {type: String, default: uuidv4 },
  sender: { type: String, required: true},
  subject: { type: String, default: '' },
  email: { type: String, required: true},
  message: { type: String, required: true},
  createdDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  source: String,
  ip: { type: String, required: true},
});

const Message = db.model('Message', messageSchema);

module.exports = Message;