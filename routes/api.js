'use strict';

const express = require('express');
const router = express.Router();

const DbComm = require('../helpers/api').DbCommunicator; 

const message = require('../models/message');
const subscriber = require('../models/subscriber');
const projectType = require('../models/projectType');
const project = require('../models/project');

const messages = new DbComm(message);
const subscribers = new DbComm(subscriber);
const projectTypes = new DbComm(projectType);
const projects = new DbComm(project);

const collections = [
  {
    messages,
    subscribers,
    project
  }
];
/**
 *  Messages api routes
 */ 
router
  .route('/message/:id')
  .get(messages.fetch)
  .put(messages.edit)
  .delete(messages.delete);

router
  .route('/message')
  .post(messages.submit);

router
  .route('/messages')
  .get(messages.fetchAll);

/**
 *  Subscriptions api routes
 */ 
router
  .route('/subscribe/:id')
  .get(subscribes.fetch)
  .put(subscribes.edit)
  .delete(subscribes.delete);

router
  .route('/subscribe')
  .post(subscribes.submit);

router
  .route('/subscribers')
  .get(subscribes.fetchAll);

/**
 *  Project Types api routes
 */ 



module.exports = router;
