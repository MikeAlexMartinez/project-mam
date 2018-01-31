'use strict';

const path = require('path');

const express = require('express');
const router = express.Router();
const async = require('async');

const logger = require('../winston');

// Schemas
const User = require('../models/user');

// Controllers and helper functions
const { fetchProjects } = require('../controllers/projects');

const { dashboard } = require('../controllers/dashboard');
const auth = require('../controllers/authentication/auth');

// admin page
router.get('', auth.isLoggedIn, function projects(req, res) {
  
  const user = req.user;
  
  dashboard()
    .then((data) => {
      const pageData = {
        location: 'admin',
        logout: true,
        user: user,
        csrfToken: req.csrfToken(),
        error: '',
        data: data
      };
        
      res.render('admin', pageData);

    })
    .catch(err => {
      const pageData = {
        location: 'admin',
        logout: true,
        user: user, 
        csrfToken: req.csrfToken(),
        error: err,
        data: ''
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

// admin projects page
router.get('/projects', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Projects',
    logout: true,
    load: 'projects',   
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});
// fetch specific project
router.get('/projects/:id', auth.isLoggedIn, function projects(req, res) {
  
  const id = req.params.id;
  const {data} = fetchProjects({ 
    filters: {
      _id: id
    } 
  });
  
  // check only one project retrieved


  // check that 

  const pageData = {
    location: `Admin - ${data[0].title}`,
    logout: true,
    load: 'projects',   
    csrfToken: req.csrfToken()
  };
  
  res.render('section', pageData);
});

// admin messages page
router.get('/messages', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Messages',
    logout: true,
    load: 'messages',    
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});
// Fetch specific message
router.get('/messages/:id', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Messages',
    logout: true,
    load: 'messages',    
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});

// admin bugs page
router.get('/bugs', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Bugs',
    logout: true,
    load: 'bugs',
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});
// fetch specific bug
router.get('/bugs/:id', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Bugs',
    logout: true,
    load: 'bugs',
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});

// admin subscribers page
router.get('/subscribers', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Subscribers',
    logout: true,
    load: 'subscribers',
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});
// fetch specific subscriber
router.get('/subscribers/:id', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Subscribers',
    logout: true,
    load: 'subscribers',
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});

module.exports = router;
