'use strict';


// Third party
const express = require('express');
const router = express.Router(); 

// Models
const Message = require('../models/message');
const Subscriber = require('../models/subscriber');
const Bug = require('../models/bug');
const Project = require('../models/project');

// my files
const logger = require('../winston');
const auth = require('../controllers/authentication/auth');

router.use('/', auth.isLoggedIn);

/**
 * Projects
 *  - create
 *  - update
 *  - delete
 */
router
  .route('/project')
  .post();

router
  .route('/project/:id')  
  .put()
  .delete();

/**
 * Bugs
 *  - update
 *  - delete
 */
router
  .route('/bug/:id')
  .put()
  .delete();

/**
 * Messages
 *  - update
 *  - delete
 */
router
  .route('/message/:id')
  .put()
  .delete();

 /**
 * Subscribers
 *  - update
 *  - delete
 */
router
  .route('/subscribe/:id')
  .put()
  .delete();

module.exports = router;