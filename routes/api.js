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
    name: 'messages',
    singular: 'message',
    model: messages
  },
  {
    name: 'subscribers',
    singular: 'subscriber',
    model: subscribers
  },
  {
    name: 'projectTypes',
    singular: 'projectType',
    model: projectTypes
  },
  {
    name: 'projects',
    singular: 'project',
    model: projects
  },
];

collections.forEach((v) => {
  router
    .route(`/${v.singular}/:id`)
    .get(v.model.fetch)
    .put(v.model.edit)
    .delete(v.model.delete);
  
  router
    .route(`/${v.singular}`)
    .post(v.model.submit);
  
  router
    .route(`/${v.name}`)
    .get(v.model.fetchAll);
});

module.exports = router;
