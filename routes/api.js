'use strict';

// Third party
const express = require('express');
const router = express.Router(); 

// Models
const Message = require('../models/message');
const Subscriber = require('../models/subscriber');
const Bug = require('../models/bug');

// my files
const logger = require('../winston');
const valid = require('../helpers/validators');
const auth = require('../controllers/authentication/auth');
const mid = require('../helpers/middlewares');

router.use(auth.captureIp);
router.use(mid.createSource);

router.use((req, res, next) => {
  // check number of requests today 
  const requestsToday = req.requestsToday;
  const ip = req.clientIp;
  
  logger('info', `type: POST; message: New Message received; ip: ${ip}; requestsToday: ${requestsToday}`);
  next();
});

const error = (err, res) => {
  
  const response = {
    message: 'We encountered an error, please try again later!',
    type: 'error',
    err: err
  };
  
  if (err.code === 11000) {
    logger('error', 'Indexed item already exists!');

    return res.status(409).send(response);
  } else {
    return res.status(500).send(response);
  }

};

router
  .route('/message')
  .post((req, res) => {
    
    // check number of requests today 
    const requestsToday = req.requestsToday;
    const ip = req.clientIp;
    
    logger('info', `message: New Message received; ip: ${ip}; requestsToday: ${requestsToday}`);

    const newMessage = req.body;
    newMessage.createdDate = new Date();
    newMessage.source = req.source;
    newMessage.ip = req.clientIp;

    // Validate message input 
    // check and cleanse name
    const name = valid.cleanString(newMessage.sender);
    if (!name) {
      logger('error', `Invalid name submitted from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a name',
        type: 'warning',
        data: ''
      };

      return res.status(409).send(response);
    }
    newMessage.sender = name;

    // check and cleanse email - is valid email address
    const email = valid.cleanseEmail(newMessage.email);
    if (!email) {
      logger('error', `Invalid email submitted from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a valid email',
        type: 'warning',
        data: ''
      };

      return res.status(409).send(response);
    }
    newMessage.email = email;

    // check and cleanse message - clean and check length
    const message = valid.cleanString(newMessage.message);
    if(!valid.messageLength(message)) {
      logger('error', `Message that was too long from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a message shorter than 600 characters',
        type: 'warning',
        data: ''
      };

      return res.status(409).send(response);
    }
    if (!message) {
      logger('error', `Invalid message from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a suitable message shorter ' + 
                 'than 600 characters and greater than 0',
        type: 'warning',
        data: ''
      };

      return res.status(409).send(response);
    }
    newMessage.message = message;

    const validMessage = new Message(newMessage);

    validMessage.save()
      .then((m) => {
        logger('info',`Message item created successfully`);
        
        const response = {
          message: `Message item created successfully`,
          type: 'success',
          data: m
        };
        
        return res.status(201).send(response);
      })
      .catch((err) => {
        logger('error', 'Error encountered');
        error(err, res);
      });
    
  });

router
  .route('/subscriber')
  .post((req, res) => {

    const newSubscriber = req.body;
    
    // check email
    const email = valid.cleanseEmail(newSubscriber.email);
    if (!email) {
      logger('error', `Invalid email submitted from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a valid email',
        type: 'warning',
        data: ''
      };

      return res.status(409).send(response);
    }
    newSubscriber.email = email;
    newSubscriber.source = req.source;
    newSubscriber.ip = req.clientIp;
    
    // save
    const cleanSubscriber = new Subscriber(newSubscriber);

    cleanSubscriber.save()
      .then((m) => {
        logger('info',`Subscriber created successfully`);
        
        const response = {
          message: `Subscriber created successfully`,
          type: 'success',
          data: m
        };
        
        return res.status(201).send(response);
      })
      .catch((err) => {
        logger('error',"Error encountered");
        error(err, res);
      });
  });

router
  .route('/bug')
  .post((req, res) => {    

    // same as message
    const newBug = req.body;
    
    // Validate message input 
    // check and cleanse name
    const name = valid.cleanString(newBug.sender);
    if (!name) {
      logger('error', `Invalid name submitted from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a valid name',
        type: 'warning',
        data: ''
      };
      
      return res.status(409).send(response);
    }
    newBug.sender = name;
    
    // check and cleanse email - is valid email address
    const email = valid.cleanseEmail(newBug.email);
    if (!email) {
      logger('error', `Invalid email submitted from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a valid email',
        type: 'warning',
        data: ''
      };
      
      return res.status(409).send(response);
    }
    newBug.email = email;
    
    // check and cleanse message - clean and check length
    const bugDescription = valid.cleanString(newBug.bugDescription);
    if(!valid.messageLength(bugDescription)) {
      logger('error', `Bug description too long from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a message shorter than 600 characters',
        type: 'warning',
        data: ''
      };
      
      return res.status(409).send(response);
    }
    if (!bugDescription) {
      logger('error', `Invalid Bug Description from ip: ${req.ip}`);
      const response = {
        message: 'Please submit a suitable message shorter ' + 
        'than 600 characters and greater than 0',
        type: 'warning',
        data: ''
      };
      
      return res.status(409).send(response);
    }
    newBug.bugDescription = bugDescription;
    
    newBug.createdDate = new Date();
    newBug.source = req.source;
    newBug.ip = req.clientIp;
    
    const validBug = new Bug(newBug);
    
    validBug.save()
      .then((m) => {
        logger('info',`Bug created successfully`);
          
        const response = {
          message: `Bug created successfully`,
          type: 'success',
          data: m
        };
          
        return res.status(201).send(response);
      })
      .catch((err) => {
        logger('error',"Error encountered");
        error(err, res);
      });
  });
    
module.exports = router;
