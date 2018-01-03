const db = require('../controllers/db');

const Schema = db.Schema;

const messageSchema = new Schema({
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