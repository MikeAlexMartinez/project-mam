const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  source: String,
  email: {type: String, index: { unique: true }},
  date: { type: Date, default: Date.now },
  validated: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;