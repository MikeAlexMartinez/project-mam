'use strict';

const express = require('express');
const router = express.Router();

const logger = require('../winston');

// Controllers
const { fetchProjects } = require('../controllers/projects');
const { fetchMessages } = require('../controllers/messages');
const { fetchBugs } = require('../controllers/bugs');
const { fetchSubscribers } = require('../controllers/subscribers');

const { dashboard } = require('../controllers/dashboard');
const auth = require('../controllers/authentication/auth');

// Helpers
const { displayDate } = require('../helpers/dates');

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

// admin page
router.get('', auth.isLoggedIn, function projects(req, res) {
  
  const user = req.user;
  
  dashboard()
    .then((data) => {
      const pageData = {
        location: 'admin',
        admin: true,
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

// admin projects page
router.get('/projects', auth.isLoggedIn, function projects(req, res) {
  
  let { page } = req.query;
  const pageData = {
    location: 'Administration - All Projects',
    admin: true,
    load: 'projects',
    type: `${status ? type : 'hide'}`,
    csrfToken: req.csrfToken(),
    prod: process.env.NODE_ENV === 'production'
  };

  if (!page) page = 1;
  
  fetchProjects({
      page: page,
      limit: 20
    })
    .then(({projects}) => {

      const formattedProjects = projects.map((p) => {   
        return {
          ...p._doc,
          createdDate: displayDate(p._doc.createdDate),
          lastUpdate: displayDate(p._doc.lastUpdate)
        }
      });

      if (projects.length === 0) {
        pageData.error = true;
        pageData.errMessage = 'Nothing to see here!';
      } else {
        pageData.projects = formattedProjects;
      }

      res.render('allProjects', pageData);

    })
    .catch((err) => {
      logger('error', err);

      pageData.error = true;
      pageData.errMessage = 'Error encountered retrieving project';

      res.render('allProjects', pageData);
    });

});
// fetch specific project
router.get('/projects/:id/:mode', auth.isLoggedIn, function projects(req, res) {
  
  const {mode, id} = req.params;

  const pageData = {
    location: `Admin - ${mode} Project`,
    admin: true,
    load: 'projects',
    edit: mode === 'edit',
    csrfToken: req.csrfToken()
  };

  fetchProjects({
      filters: {
        _id: id
      }
    })
    .then(({projects}) => {

      if (projects.length === 1) {
        pageData.project = projects[0];
      } else {
        pageData.error = true;
        pageData.errMessage = 'Error encountered retrieving project';
      }

      res.render('project', pageData);

    })
    .catch((err) => {
      logger('error', err);

      pageData.error = true;
      pageData.errMessage = 'Error encountered retrieving project';

      res.render('project', pageData);
    });
  
});

// admin messages page
router.get('/messages', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Messages',
    admin: true,
    load: 'messages',    
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});
// Fetch specific message
router.get('/messages/:id/:mode', auth.isLoggedIn, function projects(req, res) {
    
  const {mode, id} = req.params;

  const pageData = {
    location: `Admin - ${mode} Message`,
    admin: true,
    load: 'messages',
    edit: mode === 'edit',
    csrfToken: req.csrfToken()
  };

  fetchMessages({
      filters: {
        _id: id
      }
    })
    .then(({messages}) => {

      if (messages.length === 1) {
        pageData.message = messages[0];
      } else {
        pageData.error = true;
        pageData.errMessage = 'Error encountered retrieving message';
      }

      res.render('message', pageData);

    })
    .catch((err) => {
      logger('error', err);

      pageData.error = true;
      pageData.errMessage = 'Error encountered retrieving message';

      res.render('message', pageData);
    });
});

// admin bugs page
router.get('/bugs', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Bugs',
    admin: true,
    load: 'bugs',
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});
// fetch specific bug
router.get('/bugs/:id/:mode', auth.isLoggedIn, function projects(req, res) {

  const {mode, id} = req.params;
  
  const pageData = {
    location: `Admin - ${mode} Bug`,
    admin: true,
    load: 'bugs',
    edit: mode === 'edit',
    csrfToken: req.csrfToken()
  };

  fetchBugs({
      filters: {
        _id: id
      }
    })
    .then(({bugs}) => {

      if (bugs.length === 1) {
        pageData.bug = bugs[0];
      } else {
        pageData.error = true;
        pageData.errMessage = 'Error encountered retrieving bug';
      }

      res.render('bug', pageData);

    })
    .catch((err) => {
      logger('error', err);

      pageData.error = true;
      pageData.errMessage = 'Error encountered retrieving bug';

      res.render('bug', pageData);
    });
});

// admin subscribers page
router.get('/subscribers', auth.isLoggedIn, function projects(req, res) {
  const data = {
    location: 'Administration - Subscribers',
    admin: true,
    load: 'subscribers',
    csrfToken: req.csrfToken()
  };
  
  res.render('section', data);
});
// fetch specific subscriber
router.get('/subscribers/:id/:mode', auth.isLoggedIn, function projects(req, res) {

  const {mode, id} = req.params;
  
  const pageData = {
    location: `Admin - ${mode} Subscriber`,
    admin: true,
    load: 'subscribers',
    edit: mode === 'edit',
    csrfToken: req.csrfToken()
  };

  fetchSubscribers({
      filters: {
        _id: id
      }
    })
    .then(({subscribers}) => {

      if (subscribers.length === 1) {
        pageData.subscriber = subscribers[0];
      } else {
        pageData.error = true;
        pageData.errMessage = 'Error encountered retrieving subscriber';
      }

      res.render('subscriber', pageData);

    })
    .catch((err) => {
      logger('error', err);

      pageData.error = true;
      pageData.errMessage = 'Error encountered retrieving subscriber';

      res.render('subscriber', pageData);
    });
});

module.exports = router;
