'use strict';

const logger = require('../winston');
const Message = require('../models/message');

module.exports.fetchMessages = (request, response) => {
  return new Promise((res, rej) => {
    
    let { startDate, 
          endDate,
          replied,
          sort='createdDate',
          sortDirection=1,
          limit=20, 
          skip,
          page=0
        } = request.query;
    
    const sortBy = {};
    sortBy[sort] = sortDirection;
    
    const filter = {};

    // Check if filter contains start date in query
    if (startDate || endDate) {
      filter.createdDate = {};
    
      if (startDate) {
        filter.createdDate.$gte = new Date(startDate);
      }
      if(endDate) {
        filter.createdDate.$lt = new Date(endDate);
      }
    }

    skip = page * limit;

    // parse tags provided (if any)
    if (replied) {
      filter.replied = replied;
    }

    Message
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .exec((err, messages) => {
        let data = {};
        
        if (err) {
          logger('error', 'error retrieving messages from db');
          
          data.message = 'error retrieving messages from db';
          data.type = 'error';
          data.projects = [];

          rej(data);
        } else {
 
          if (!projects || projects.length === 0) {
            logger('info', 'no messages returned');
            
            data.message = 'No messages returned';
            data.type = 'error';
            data.projects = [];
            
            rej(data);
          } else {
            logger('info', `Retrieved ${messages.length} Messages succesfully`);
            data.type = 'success';
            data.messages = messages;

            res(data);
          }
        }
      });
  });
};
