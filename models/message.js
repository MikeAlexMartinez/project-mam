const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: String,
  subject: { type: String, default: '' },
  email: String,
  message: String,
  date: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  important: { type: Boolean, default: false },
  replied: { type: Boolean, default: false },
  source: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;