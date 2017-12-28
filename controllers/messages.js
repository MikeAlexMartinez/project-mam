const mongoose = require('mongoose');
const db = require('./db');
const Message = require('../models/message');

exports.submit = (req, res) => {
  console.log("message request received");

  db((err) => {
    if (err) {
      console.log("Error connecting to database!");
      const message = req.body;
      
      message.error = "Error connecting to database, please retry later.";
      res.status(500).send(message);
    }

    const newMessage = req.body;
    
    newMessage.source = 'Deft';  
    newMessage.date = new Date();
    
    const message = new Message(newMessage);
    
    const saved = (m) => {
      console.log("Message saved succesfully");
      
      const response = {
        message: "Message received! Check your inbox ( ^_^)",
        type: "success",
      }
      
      mongoose.disconnect();
      res.status(201).send(response);
    };
    
    const error = (err) => {
      
      const response = {
        message: "We encountered an error, please try again later!",
        type: "error",
      }

      mongoose.disconnect();
      res.status(500).send(repsonse);
    }
    
    message.save()
      .then(saved)
      .catch(error);
  });
  
};