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
router.get('', function projects(req, res, next) {
  
  if( !req.session.userId ) {
    logger('info', 'admin access DENIED. No session present');

    const message = encodeURIComponent('You must login to view this page...');
    const type = encodeURIComponent('warning');

    res.redirect('/admin/login?message=' + message + '&type=' + type);

  } else {
    
    User.findById(req.session.userId)
      .exec((err, user) => {
        
        if ( err || !user ) {
          logger('info','user session not found');
          
          const message = encodeURIComponent('You must login to view this page...');
          const type = encodeURIComponent('warning');
    
          res.redirect('/admin/login?message=' + message + '&type=' + type);
          
        } else {
          
          // fetch all data...
          res.render('admin', { location: 'admin', user: user });
        }
      });
  }
    
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
    type: `${status ? type : 'hide'}`
  };

  res.render('adminLogin', data);
});

module.exports = router;
