'use strict';

const db = require('../controllers/db');
const uuidv4 = require('uuid/v4');

const Schema = db.Schema;

const messageSchema = new Schema({
  _id: {type: String, default: uuidv4() },
  sender: String,
  subject: { type: String, default: '' },
  email: String,
  message: String,
  createdDate: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  source: String
});

const Message = db.model('Message', messageSchema);

module.exports = Message;