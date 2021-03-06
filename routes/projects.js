'use strict';

const express = require('express');
const router = express.Router();

const projects = [
  require('./project-routes/minifolio-clone'),
  require('./project-routes/resume-clone'),
  require('./project-routes/ranger-clone'),
  require('./project-routes/deft-clone'),
  require('./project-routes/hanoi-towers'),
];

projects.forEach( project => {

  project.forEach( ({ method, route, fn }) => {

    router[method](route, fn);
  });

});

module.exports = router;