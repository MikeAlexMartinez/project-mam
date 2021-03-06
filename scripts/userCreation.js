'use strict';

require('dotenv').config();

const mongoose = require('../controllers/db');

const User = require('../models/user');

const admin = {
  username: process.env.NAME,
  password: process.env.PASSWORD,
  ipAddresses: process.env.IP
};

User.create(admin,(err, user) => {
  if (err) {
    console.error('Error creating admin user');
    console.error(err);
    process.exit(1);
  }
  console.log('Admin user succesfully created');
  process.exit(0);
});
