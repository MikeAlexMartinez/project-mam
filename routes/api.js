const express = require('express');
const router = express.Router();

const messages = require('../controllers/messages');
const subscribe = require('../controllers/subscribe');

router
  .route('/message')
  .post(messages.submit);

router
  .route('/subscribe')
  .post(subscribe.submit);

module.exports = router;  