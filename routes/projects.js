'use strict';

const fs = require('fs');
const path = require('path');

const express = require('express');
const router = express.Router();

router
  .route('/resume-clone/*')
  .get(function homePage(req, res) {
    const route = req.params[0].split('/') || [];
    console.log(route);
    res.render('projects/resume-clone/home', {title: "Resume"});
  });

module.exports = router;