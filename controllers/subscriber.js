'use strict';

const mongoose = require('mongoose');
const db = require('./db');
const Subscription = require('../models/subscribe');

exports.submit = (req, res) => {
  console.log('subscribe request received');

  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    let newSubscriber = req.body;
    
    newSubscriber.source = 'Deft';  
    newSubscriber.date = new Date();
    
    const subscriber = new Subscription(newSubscriber);

    const saved = (m) => {
      console.log(m);
      console.log('Message saved succesfully');
      
      const response = {
        message: 'You\'ve been added to my mailing list! ( ^_^)',
        type: 'success',
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      console.log('==========================================');
      console.log(err.code);

      const disconnect = function(status, response) {
        mongoose.disconnect();
        res.status(status).send(response);
      };

      const response = {
        message: 'We encountered an error, please try again later',
        type: 'error',
      };

      if (err.code === 11000) {
        response.message = 'This email address is already subscribed ( -_-)';

        disconnect(409, response);
        return;
      } 

      disconnect(500, response);

      
    };
    
    subscriber.save()
      .then(saved)
      .catch(error);
  });
  
};

exports.edit = (req, res) => {
  console.log('Edit subscribe document requested');

  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    const fields = req.body;
    
    const updated = (m) => {
      console.log(m);
      console.log('Subscriber updated succesfully');
      
      const response = {
        message: `Subscriber ${req.body.email} has been updated!`,
        type: 'success',
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      console.log('==========================================');
      console.log(err.code);
      
      const response = {
        message: 'We encountered an error, please try again later',
        type: 'error',
      };
      
      mongoose.disconnect();
      res.status(501).send(response);
      
    };
    
    Subscription.findByIdAndUpdate(req.params.id, fields)
      .then(updated)
      .catch(error);
  });
};

exports.delete = (req, res) => {
  console.log('Received a delete subscriber request!');

  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    
    const removed = (m) => {
      console.log(m);
      console.log('Subscriber removed succesfully');
      
      const response = {
        message: `Subscriber ${req.params.email} has been deleted!`,
        type: 'success',
      };
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      console.log('==========================================');
      console.log(err.code);
      
      const response = {
        message: 'We encountered an error, please try again later',
        type: 'error',
      };
      
      mongoose.disconnect();
      res.status(501).send(response);
      
    };
    
    Subscription.findByIdAndRemove(req.params.id)
      .then(removed)
      .catch(error);
  });
};

exports.fetchAll = (req, res) => {
  console.log('Subscriber fetchAll request received');
  
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
      console.log('Subscriber(s) fetched succesfully');
      
      const response = {
        message: 'Subscriber(s) fetched!',
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
    
    Subscription.find(filter)
      .then(fetched)
      .catch(error);
  });
};

exports.fetch = (req, res) => {
  console.log('subscriber fetch request received');
  
  db((err) => {
    if (err) {
      console.log('Error connecting to database!');
      const message = req.body;
      
      message.error = 'Error connecting to database, please retry later.';
      res.status(500).send(message);
    }

    const id = req.params.id;

    const fetched = (m) => {
      console.log('Subscriber fetched succesfully');
      
      const response = {
        message: 'Subscriber retrieved!',
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
    
    Subscription.findById(id)
      .then(fetched)
      .catch(error);
  });
};