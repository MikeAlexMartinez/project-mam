'use strict';

const path = require('path');

const express = require('express');
const router = express.Router();
const async = require('async');

const logger = require('../winston');

// Schemas
const User = require('../models/user');

// Controllers and helper functions
const fetchMessages = require('../controllers/fetchMessages').fetchMessages;
const auth = require('../controllers/authentication/auth');

// admin page
router.get('', auth.isLoggedIn, function projects(req, res) {
  
  const user = req.user;
  let data = {};

  async.parallel({
    bugs: () => {},
    ips: () => {},
    messages: (cb) => {
      const query = {};

      fetchMessages(query)
        .then((messages) => {
          cb(null, messages);
        })
        .catch((err) => {
          cb(err);
        });

    },
    projects: () => {},
    subscribers: () => {},
  }, function processData(err, items){

    const pageData = {
      location: 'admin', 
      user: user, 
      csrfToken: req.csrfToken(),
      error: err,
      data: items 
    };
    
    res.render('admin', pageData);

  });

    
});

// admin-login page
router.get('/login', function projects(req, res) {
  // Should make toast into middleware
  const message = req.query.message || '';
  const status = message !== '';
  const type = req.query.type;

  const data = {
    location: 'admin-login',
    status: status,
    message: message,
    type: `${status ? type : 'hide'}`,
    csrfToken: req.csrfToken()
  };

  res.render('adminLogin', data);
});

module.exports = router;
