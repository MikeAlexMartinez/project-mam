'use strict';

const mongoose = require('mongoose');
const logger = require('../winston');

const conStates = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
  4: 'unauthorized',
  99: 'uninitialized'
};

function DbCommunicator(Model) {
  const name = Model.modelName;
  const error = (err, res) => {
    
    const response = {
      message: 'We encountered an error, please try again later!',
      type: 'error',
      err: err
    };
    
    if (err.code === 11000) {
      logger.error('Indexed item already exists!');

      res.status(409).send(response);
    } else {
      res.status(500).send(response);
    }
  
  };

  return {
    name: name,
    submit: function(req, res) {      
      logger.info(`${name} request received`);
      
      const newModel = req.body;
        
      newModel.createdDate = new Date();
      
      const model = new Model(newModel);
      
      const saved = (m) => {
        logger.info(`${name} item created succesfully`);
        
        const response = {
          message: `${name} item created succesfully`,
          type: 'success',
          data: m
        };
        
        res.status(201).send(response);
      };
      
      model.save()
        .then(saved)
        .catch((err) => {
          logger.error("Error encountered");
          error(err, res);
        });
    },
    fetch: function(req, res) {
      logger.info(`${name} fetch request received`);
      
      const id = req.params.id;
    
      const fetched = (m) => {
        const message = `${name} item fetched succesfully`;
        logger.info(message);
        
        const response = {
          message: message,
          type: 'success',
          data: m
        };
        
        res.status(200).send(response);
      };
      
      Model.findById(id)
        .then(fetched)
        .catch((err) => {
          error(err, res);
        });
    },
    edit: function(req, res) {
      logger.info(`${name} update request received`);

      const id = req.params.id;
      const updatedItem = req.body;
      
      const updated = (m) => {
        const message = `${name} item updated successfully`;
        
        logger.info(message);
        
        const response = {
          message: message,
          type: 'success',
          data: m
        };
        
        res.status(200).send(response);
      };
        
      Model.findByIdAndUpdate(id, updatedItem)
        .then(updated)
        .catch((err) => {
          error(err, res);
        });
    },
    delete: function(req, res) {
      logger.info(`${name} delete request received`);
    
      const id = req.params.id;
  
      const deleted = (m) => {
        const message = `${name} deleted successfully`;
        
        logger.info(message);
        
        const response = {
          message: message,
          type: 'success',
          data: m
        };
        
        res.status(200).send(response);
      };
      
      Model.findByIdAndRemove(id)
        .then(deleted)
        .catch((err) => {
          error(err, res);
        });
    },
    fetchAll: function(req, res) {
      logger.info(`${name} fetchAll request received`);
      
      const conState =  mongoose.connection.readyState;

      if(conState !== 1) {
        error(new Error(`ERROR: MongoDB Connection State is ${conStates[conState]}`), res);
      } else {

        const filter = req.query;
        
        const fetched = (m) => {
          const message = `${name} item(s) fetched succesfully`;
          logger.info(message);
          
          const response = {
            message: message,
            type: 'success',
            data: m
          };
          
          res.status(200).send(response);
        };
        
        Model.find(filter, null, {maxTimeMS: 5000 })
        .then(fetched)
        .catch((err) => {
          error(err, res);
        });
      }
    }
  };
}

module.exports = {
  DbCommunicator: DbCommunicator,
};
