'use strict';

const express = require('express');
const router = express.Router(); 

const Message = require('../models/message');
const Subscriber = require('../models/subscriber');
const Bug = require('../models/bug');
const Ip = require('../models/ip');

const logger = require('../winston');
const auth = require('../controllers/authentication/auth');

router.use(auth.captureIp);

router
  .route('/message')
  .post((req, res) => {
    
    // check number of requests today 
    const requestsToday = req.requestsToday;
    const ip = req.clientIp;

    // check number of messages from IP address
    
    
    // check number of messages from email
    
    logger('info', `message: New Message received; ip: ${ip}; requestsToday: ${requestsToday}`)

    // Same applies to bugs
    // Validate message input 
    // check and cleanse sender - should be a name

    // check and cleanse email - is valid email address

    // check and cleanse message - 
    const newMessage = req.body;
    newMessage.createdDate = new Date();
    newMessage.source = '';

  });

router
  .route('/subscribe')
  .post((req, res) => {

  });

router
  .route('/bug')
  .post((req, res) => {

  });


module.exports = router;
