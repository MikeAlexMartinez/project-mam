'use strict';

const express = require('express');
const router = express.Router();

const messages = require('../controllers/messages');
const subscribe = require('../controllers/subscribe');
const projectTypes = require('../controllers/projectTypes');

// Messages api routes
router
  .route('/message/:id')
  .get(messages.fetch)
  .put(messages.edit)
  .delete(messages.delete);

router
  .route('/message')
  .post(messages.submit);

/**
 * Subscriptions api routes
 */ 
router
  .route('/subscribe/:id')
  .get(subscribe.fetch)
  .put(subscribe.edit)
  .delete(subscribe.delete);

router
  .route('/subscribe')
  .post(subscribe.submit);

  /**
 * Project Types api routes
 */ 

// fetch all 1st level types (parent field is null)
router
  .route('/projecttypes/types')
  .get(projectTypes.fetchTypes);

// fetch specfic parent type
router
  .route('/projecttypes/types/:type')
  .get(projectTypes.fetchType);

// fetch all types that have parents (ie. 2nd level subtypes)  
router
  .route('/projecttypes/subtypes')
  .get(projectTypes.fetchSubtypes);

// fetch specific subtype
router
  .route('/projecttypes/subtypes/:subtype')
  .get(projectTypes.fetchSubtype);

// fetch specific subtype with defined parent type
router
.route('/projecttypes/subtypeof/:type')
.get(projectTypes.fetchSubtypeOf);

// fetch all projects
router  
  .route('/projecttypes')
  .get(projectTypes.fetchAll);


module.exports = router;
