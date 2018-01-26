'use strict';

// Third party modules
const express = require('express');
const router = express.Router();

const logger = require('../winston');

// Controllers
const fetchProjects = require('../controllers/fetchProjects').fetchProjects;

// Models
const User = require('../models/user');

// Application data
const appData = require('../scripts/project-mam-data');

// api routes
router.use('/api', require('./api'));

// project routes
router.use('/view', require('./projects'));

// admin routes
router.use('/admin', require('./admin'));

// login route - handles calls from home and admin-login
router.post('/login', (req, res, next) => {
  User.authenticate(req.body.name, req.body.password, (err, user) => {
    if (err || !user) {
      const err = new Error('Wrong username or password');
      err.status = 401;
      res.send({error: 'Incorrect Credentials!'});
    } else {
      req.session.userId = user._id;
      res.redirect('/admin');
    }
  });
});

// logout route
router.get('/logout', (req, res, next) => {
  logger('info', 'Logout request received');
  if (req.session) {
    req.session.destroy( function(err) {
      if (err) {
        logger('error', 'Error Destroying session');
        return next(err);
      } else {
        logger('info', 'Session Destoyed');
        res.redirect('/');
      }
    });
  } else {
    console.log("no session");
    const err = new Error('no session to logout from');
    err.status = 401;
    return next(err);
  } 
});

// projects page
router.get('/projects', function projects(req, res) {

  fetchProjects(req, res)
    .then((data) => {
      
      if (process.env.NODE_ENV === 'development') {
        data.dev = true;
      } else {
        data.prod = true;
      }

      res.render('projects', data);
    
    })
    .catch((err) => {
      logger.err(err);
      res.render('projects', 
        {
            location: 'projects',
            error: 'Error encountered'
        });
    });

});

// Blog page
router.get('/blog', function projects(req, res) {

  res.render('blog', { location: 'blog', filtered: false, posts: [] });
});

// home route
router.get(/^\/(home)?$/, function homePage(req, res) {

  res.render('home', {location: 'home', data: appData.data });
});

// fallback route
router.all('*', function notFound(req, res) {
  res.render('notfound', { location: 'Whoops! Did someone take a wrong turn?', nothing: true });
});

module.exports = router;