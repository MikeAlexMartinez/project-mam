const mongoose = require('mongoose');
const db = require('./db');
const Subscription = require('../models/subscribe');

exports.submit = (req, res) => {
  console.log("subscribe request received");

  db((err) => {
    if (err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);
    }

    let newSubscriber = req.body;
    
    newSubscriber.source = 'Deft';  
    newSubscriber.date = new Date();
    
    const subscriber = new Subscription(newSubscriber);

    const saved = (m) => {
      console.log("Message saved succesfully");
      
      const response = {
        message: "You've been added to my mailing list! ( ^_^)",
        type: "success",
      }
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      console.log("==========================================");
      console.log(err.code);

      const response = {
        message: "We encountered an error, please try again later",
        type: "error",
      }

      if (err.code === 11000) {
        response.message = "This email address is already subscribed ( -_-)";

        disconnect(409, response);
        return;
      } 

      console.log("this still runs!");
      disconnect(500, response);

      function disconnect(status, response) {
        mongoose.disconnect();
        res.status(status).send(response);
      }
    }
    
    subscriber.save()
    .then(saved)
    .catch(error);
  });
  
};
