'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const logger = require('../winston');

const dotenv = require('dotenv');
dotenv.config();

const salt = process.env.SALT;
const addSalt = (str) => str + '' + salt;

const UserSchema = new Schema({
  _id: {type: String, default: uuidv4 },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true
  },
  ipAddresses: [ String ],
  numLogins: {
    type: Number,
    get: v => Math.round(v),
    set: v => Math.round(v),
    alias: 'i',
    default: 0
  },
  lastLogin: {
    type: Date,
    default: new Date()
  },
  createdDate: {
    type: Date,
    default: new Date()
  }
});

// authenticate input against the database
UserSchema.statics.authenticate = (username, password, cb) => {
  User.findOne({ username: username })
    .exec((err, user) => {
      if (err) return cb(err);
      if (!user) {
        const err = new Error('User not found');
        err.status = 401;
        return cb(err);
      }

      console.log(addSalt(password));

      // bcrypt compare with added salty goodness
      bcrypt.compare(addSalt(password), user.password, (err, result) => {
        if (err) return cb(err);
        if (result !== true) {
          return cb(new Error('incorrect password'));
        }

        // Increment time of last login and number of logins
        user.lastLogin = new Date;
        user.numLogins += 1;

        // Check IP Addresses here?

        User.findByIdAndUpdate(user._id, user,(err, user) => {
          if (err) {
            logger('error', 'Error encountered updating user on login');
            return cb(err);
          }
          if (!user) {
            logger('error', 'no user found');
            return cb(err);
          }

          logger('info', 'User login successful');
          return cb(null, user);
        });

      });
    });
};

UserSchema.pre('save', function(next) {
  const user = this;
  console.log(addSalt(user.password));
  // bcrypt hash with added salty goodness
  bcrypt.hash(addSalt(user.password), 12, (err, hash) => {
    if (err) return next(err);

    user.password = hash;

    next();
  });
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
