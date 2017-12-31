'use strict';

const mongoose = require('mongoose');
const db = require('./db');
const projectTypes = require('../models/projectType');

exports.fetchAll = (req, res) => {
  console.log("projectTypes.fetchAll request received");

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
    
    projectTypes.find({})
      .then(fetched)
      .catch(error);
  });
  
};

// Fetch all parent types of projects
exports.fetchTypes = (req, res) => {
  console.log("projectTypes.fetchTypes request received");
  
  db((err) => {
    if(err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);  
    }

    const found = (m) => {

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
    };
  
    projectTypes.find({parent: null})
      .then(found)
      .catch(error);
  });
  
};

// Fetch a single type of project
exports.fetchType = (req, res) => {
  console.log("projectTypes.fetchTypes request received");
  
  db((err) => {
    if(err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);  
    }

    const type = req.params.type;
  
    const found = (m) => {

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
    };
  
    projectTypes.find({name: type})
      .then(found)
      .catch(error);
  });
  
};

// Fetch all subtypes
exports.fetchSubtypes = (req, res) => {
  console.log("projectTypes.fetchSubtypes request received");
  
  db((err) => {
    if(err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);  
    }
  
    const found = (m) => {

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
    };
  
    projectTypes.find({ parent: { $ne: null }})
      .then(found)
      .catch(error);
  });
  
};


// Fetch a single subtype of project
exports.fetchSubtype = (req, res) => {
  console.log("projectTypes.fetchSubtypes request received");
  
  db((err) => {
    if(err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);  
    }

    const subtype = req.params.subtype;
  
    const found = (m) => {

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
    };
  
    projectTypes.find({ name: subtype })
      .then(found)
      .catch(error);
  });
  
};

// Fetch a subtypes with defined parent
exports.fetchSubtypeOf = (req, res) => {
  console.log("projectTypes.fetchSubtypesOf request received");
  
  db((err) => {
    if(err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);  
    }

    const type = req.params.type;
  
    const found = (m) => {

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
    };
  
    projectTypes.find({ parent: type })
      .then(found)
      .catch(error);
  });
  
};