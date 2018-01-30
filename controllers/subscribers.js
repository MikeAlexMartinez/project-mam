'use strict';

const logger = require('../winston');
const Subscriber = require('../models/subscriber');

module.exports.fetchSubscribers = (query) => {
  return new Promise((res, rej) => {
    
    let { startDate=null, 
          endDate=null,
          filters={},
          sort='createdDate',
          sortDirection=-1,
          limit=20,
          page=1,
          select={}
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

    Subscriber
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(select)
      .exec((err, subscribers) => {
        let data = {};

        if (err) {
          logger('error', 'error retrieving subscribers from db');
          
          data.message = 'error retrieving subscribers from db';
          data.type = 'error';
          data.subscribers = [];
          data.err = err;

          rej(data);
        } else {
 
          if (!subscribers || subscribers.length === 0) {
            logger('info', 'no subscribers returned');
            
            data.message = 'No subscribers returned';
            data.type = 'error';
            data.subscribers = [];
            
            res(data);
          } else {
            logger('info', `Retrieved ${subscribers.length} Subscribers succesfully`);
            data.type = 'success';
            data.subscribers = subscribers;

            res(data);
          }
        }
      });
  });
};

module.exports.countSubscribers = (query) => {
  return new Promise((res, rej) => {

    // Check if filter contains start date in query
    let { startDate, endDate } = query;
    if (startDate || endDate) {
      query.createdDate = {};
    
      if (startDate) {
        query.createdDate.$gte = new Date(startDate);
        delete query.startDate;
      }
      if (endDate) {
        query.createdDate.$lt = new Date(endDate);
        delete query.endDate;
      }
    }

    Subscriber
      .count(query, (err, count) => {
        let data = {};

        if (err) {
          logger('error', 'error counting subscribers in db');

          data.message = 'error counting subscribers in db';
          data.type = 'error';
          data.count = null;

          rej(data);
        } else {

          logger('info', `${count} Subscribers met criteria`);

          data.type = 'success';
          data.count = count;

          res(data);
        }
      });
  });
};