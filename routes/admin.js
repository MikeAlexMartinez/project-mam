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
router.get('', auth.isLoggedIn, function projects(req, res, next) {
  
  if( !req.session.userId ) {
    logger('info', 'admin access DENIED. No session present');
    res.redirect('/admin/login');
  }

  // if logged in...
  User.findById(req.session.userId)
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) {
        logger('error','user session not found');
        const err = new Error('User session not found');
        err.status = 400;
        res.redirect('/admin/login');
      } else {
        
        // fetch all data...
        
        res.render('admin', { location: 'admin', user: user });
      }
    });

});

// admin-login page
router.get('/login', function projects(req, res) {
  
  res.render('adminLogin', {location: 'admin-login'});
});



module.exports = router;