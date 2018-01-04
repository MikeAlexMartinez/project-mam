'use strict';

const express = require('express');
const router = express.Router();

const DbComm = require('../helpers/api').DbCommunicator; 

const message = require('../models/message');
const subscriber = require('../models/subscriber');
const projectType = require('../models/projectType');
const project = require('../models/project');

const collections = [
  {
    name: 'messages',
    singular: 'message',
    model: new DbComm(message)
  },
  {
    name: 'subscribers',
    singular: 'subscriber',
    model: new DbComm(subscriber)
  },
  {
    name: 'projecttypes',
    singular: 'projecttype',
    model: new DbComm(projectType)
  },
  {
    name: 'projects',
    singular: 'project',
    model: new DbComm(project)
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
