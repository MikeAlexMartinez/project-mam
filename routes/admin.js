'use strict';

const path = require('path');

const express = require('express');
const router = express.Router();

const logger = require('../winston');

// Schemas
const User = require('../models/user');

// Controllers and helper functions
const auth = require('../controllers/authentication/auth');

// admin page
router.get('', auth.isLoggedIn, function projects(req, res) {
  
  const user = req.user;

  res.render('admin', { location: 'admin', user: user, csrfToken: req.csrfToken() });
    
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
