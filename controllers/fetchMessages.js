'use strict';

const logger = require('../winston');
const Message = require('../models/message');

module.exports.fetchMessages = (query) => {
  return new Promise((res, rej) => {
    
    let { startDate=null, 
          endDate=null,
          filters={},
          sort='createdDate',
          sortDirection=-1,
          limit=20,
          page=1
        } = query;
    let skip;
    const filter = {};
    const sortBy = {};
    sortBy[sort] = sortDirection;
    

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

    // Set skip to allow for creation of page lists
    skip = (page-1) * limit;

    // parse filters provided (if any)
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filter[key] = filters[key];
        }
      });
    }

    Message
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .exec((err, messages) => {
        let data = {};

        if (err) {
          logger('error', 'error retrieving messages from db');
          
          data.message = 'error retrieving messages from db';
          data.type = 'error';
          data.projects = [];

          rej(data);
        } else {
 
          if (!messages || messages.length === 0) {
            logger('info', 'no messages returned');
            
            data.message = 'No messages returned';
            data.type = 'error';
            data.messages = [];
            
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
