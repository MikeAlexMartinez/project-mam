'use strict';

const mongoose = require('mongoose');
const db = require('./db');
const project = require('../models/project');

exports.fetchAll = (req, res) => {
  console.log("project.fetchAll request received");

  db((err) => {
    if (err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);
    }
    
    const fetched = (m) => {
      console.log("Project Types");
      
      mongoose.disconnect();
      res.status(201).send(m);
    };
    
    const error = (err) => {
      console.log(err);

      const response = {
        message: "We encountered an error, please try again later!",
        type: "error",
      }

      mongoose.disconnect();
      res.status(500).send(response);
    }
    
    project.find({})
      .then(fetched)
      .catch(error);
  });
  
};