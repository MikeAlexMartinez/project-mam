'use strict';

// Third party modules
const express = require('express');
const router = express.Router();

// Application data
const appData = require('../scripts/appData');

// api routes
router.use('/api', require('./api'));
  
// projects page
router.get('/projects', function projects(req, res) {

  res.render('projects', {});
});

// Blog page
router.get('/blog', function projects(req, res) {
  
  res.render('blog', {});
});

// admin page
router.get('/admin', function projects(req, res) {
  
  res.render('admin', {});
});

// Blog page
router.get('/admin-login', function projects(req, res) {
  
  res.render('adminLogin', {});
});

// home route
router.get('/', function homePage(req, res) {

  res.render('home', {title: "Deft - Home", data: appData.data });
});

// fallback route
router.all('*', function notFound(req, res) {
  res.render('notfound');
});

module.exports = router;