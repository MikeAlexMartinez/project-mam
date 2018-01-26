'use strict';

const express = require('express');
const router = express.Router();

const DbComm = require('../helpers/api').DbCommunicator; 

const message = require('../models/message');
const subscriber = require('../models/subscriber');
const projectType = require('../models/projectType');
const project = require('../models/project');
const bug = require('../models/bug');

router.use(function(req, res, next) {
  

  // .. some logic here .. like any other middleware
  next();
});

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
  {
    name: 'bugs',
    singular: 'bug',
    model: new DbComm(bug)
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
