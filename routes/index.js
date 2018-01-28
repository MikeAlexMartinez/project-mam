'use strict';

// Third party modules
const express = require('express');
const router = express.Router();
const csurf = require('csurf');
const ExpressBrute = require('express-brute');
const MongooseStore = require('express-brute-mongoose');
const BruteForceSchema = require('express-brute-mongoose/dist/schema');
const mongoose = require('mongoose');

const { noCache } = require('../helpers/middlewares');
const logger = require('../winston');

// enable csurf
const csrfProtection = csurf({ cookie: true });

// Controllers
const fetchProjects = require('../controllers/fetchProjects').fetchProjects;

// Models
const User = require('../models/user');

// Application data
const appData = require('../scripts/project-mam-data');

// Create brute force protections
const bruteModel = mongoose.model('bruteforce', BruteForceSchema);
const store = new MongooseStore(bruteModel);
const bruteforce = new ExpressBrute(store);

router.use(bruteforce.prevent);

// api routes
router.use('/api', require('./api'));

// project routes
router.use('/view', require('./projects'));

// admin routes
router.use('/admin', require('./admin'));

// disable cookie cache
router.use(noCache);

// login route - handles calls from home and admin-login
router.post('/login', bruteforce.prevent, (req, res) => {

  User.authenticate(req.body.name, req.body.password, (err, user) => {
    if (err || !user) {
      const message = encodeURIComponent('Incorrect credentials were provided...');
      const type = encodeURIComponent('warning');

      res.redirect('/?message=' + message + '&type=' + type);
    
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
        
        const message = encodeURIComponent('Logged out succesfully');
        const type = encodeURIComponent('success');
  
        res.redirect('/?message=' + message + '&type=' + type);
      }
    });
  } else {
    logger('info','no current session to logout from');
    const err = new Error('no session to logout from');
    err.status = 401;
    return next(err);
  } 
});

// projects page
router.get('/projects', function projects(req, res) {

  fetchProjects(req, res)
    .then((data) => {
      
      console.log(data);

      if (process.env.NODE_ENV === 'development') {
        data.dev = true;
      } else {
        data.prod = true;
      }

      data.location = 'projects';
      data.csrfToken = req.csrfToken();

      res.render('projects', data);
    
    })
    .catch((err) => {
      logger('error', err);
      res.render('projects', 
        {
            location: 'projects',
            error: 'Error encountered',
            csrfToken: req.csrfToken()
        });
    });

});

// Blog page
router.get('/blog', function projects(req, res) {

  res.render('blog', { 
    location: 'blog', 
    filtered: false, 
    posts: [],
    csrfToken: req.csrfToken() 
  });

});

// home route
router.get(/^\/(home)?$/, function homePage(req, res) {

  // Should make toast into middleware
  const message = req.query.message || '';
  const status = message !== '';
  const type = req.query.type;

  const data = {
    location: 'home', 
    data: appData.data,
    status: status,
    message: message,
    type: `${status ? type : 'hide'}`,
    csrfToken: req.csrfToken()
  };

  res.render('home', data);
});

// fallback route
router.all('*', function notFound(req, res) {
  res.render('notfound', { 
    location: 'Whoops! Did someone take a wrong turn?', 
    nothing: true,
    csrfToken: req.csrfToken() 
  });
});

module.exports = router;