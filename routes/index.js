'use strict';

// Third party modules
const express = require('express');
const router = express.Router();

const logger = require('../winston');

// Controllers
const fetchProjects = require('../controllers/fetchProjects').fetchProjects;

// Application data
const appData = require('../scripts/project-mam-data');

// api routes
router.use('/api', require('./api'));

// project routes
router.use('/view', require('./projects'));

// projects page
router.get('/projects', function projects(req, res) {

  fetchProjects(req, res)
    .then((data) => {
      
      if (process.env.NODE_ENV === 'development') {
        data.dev = true;
      } else {
        data.prod = true;
      }
      
      console.log(data);

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
  
  res.render('blog', {location: 'blog', filtered: false});
});

// admin page
router.get('/admin', function projects(req, res) {
  
  res.render('admin', {location: 'admin'});
});

// admin-login page
router.get('/admin-login', function projects(req, res) {
  
  res.render('adminLogin', {location: 'admin'});
});

// home route
router.get('/', function homePage(req, res) {

  res.render('home', {location: 'home', data: appData.data });
});

// fallback route
router.all('*', function notFound(req, res) {
  res.render('notfound');
});

module.exports = router;