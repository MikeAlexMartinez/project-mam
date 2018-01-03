'use strict';

const mongoose = require('mongoose');
const db = require('./db');
const Message = require('../models/message');

exports.submit = (req, res) => {
  console.log('message request received');

  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    const newMessage = req.body;
    
    newMessage.source = 'Deft';  
    newMessage.date = new Date();
    
    const message = new Message(newMessage);
    
    const saved = (m) => {
      console.log('Message saved succesfully');
      
      const response = {
        message: 'Message received! Check your inbox ( ^_^)',
        type: 'success',
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      
      const response = {
        message: 'We encountered an error, please try again later!',
        type: 'error',
        err: err
      };

      mongoose.disconnect();
      res.status(500).send(response);
    };
    
    message.save()
      .then(saved)
      .catch(error);
  });
  
};

exports.fetch = (req, res) => {
  console.log('message fetch request received');
  
  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    const id = req.params.id;

    const fetched = (m) => {
      console.log('Message fetched succesfully');
      
      const response = {
        message: 'Message retrieved!',
        type: 'success',
        data: m
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      
      const response = {
        message: 'We encountered an error, please try again later!',
        type: 'error',
        err: err
      };

      mongoose.disconnect();
      res.status(500).send(response);
    };
    
    Message.findById(id)
      .then(fetched)
      .catch(error);
  });
};

exports.edit = (req, res) => {
  console.log('message fetch request received');
  
  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    const id = req.params.id;

    const updatedMessage = req.body;

    const updated = (m) => {
      console.log('Message updated succesfully');
      
      const response = {
        message: 'Message updated!',
        type: 'success',
        data: m
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      
      const response = {
        message: 'We encountered an error, please try again later!',
        type: 'error',
        err: err
      };

      mongoose.disconnect();
      res.status(500).send(response);
    };
    
    Message.findByIdAndUpdate(id, updatedMessage)
      .then(updated)
      .catch(error);
  });
};

exports.delete = (req, res) => {
  console.log('message delete request received');
  
  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    const id = req.params.id;

    const deleted = (m) => {
      console.log('Message deleted succesfully');
      
      const response = {
        message: 'Message deleted!',
        type: 'success',
        data: m
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      
      const response = {
        message: 'We encountered an error, please try again later!',
        type: 'error',
        err: err
      };

      mongoose.disconnect();
      res.status(500).send(response);
    };
    
    Message.findByIdAndRemove(id)
      .then(deleted)
      .catch(error);
  });
};

exports.fetchAll = (req, res) => {
  console.log('message fetchAll request received');
  
  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    console.log(req.query);

    const filter = req.query;

    const fetched = (m) => {
      console.log('Message(s) fetched succesfully');
      
      const response = {
        message: 'Message deleted!',
        type: 'success',
        data: m
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      
      const response = {
        message: 'We encountered an error, please try again later!',
        type: 'error',
        err: err
      };

      mongoose.disconnect();
      res.status(500).send(response);
    };
    
    Message.find(filter)
      .then(fetched)
      .catch(error);
  });
};