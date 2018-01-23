'use strict';

const express = require('express');
const router = express.Router();

const projects = [
  require('./project-routes/minifolio-clone'),
  require('./project-routes/resume-clone')
];

projects.forEach( project => {

  console.log('projectLength: ' + project.length);

  project.forEach( ({ method, route, fn }) => {
    console.log(method, route);

    router[method](route, fn);
  });

});

module.exports = router;