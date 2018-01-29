'use strict';

const logger = require('../winston');
const Bug = require('../models/bug');

module.exports.fetchBugs = (query) => {
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

    Bug
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .exec((err, bugs) => {
        let data = {};

        if (err) {
          logger('error', 'error retrieving bugs from db');
          
          data.message = 'error retrieving bugs from db';
          data.type = 'error';
          data.bugs = [];

          rej(data);
        } else {
 
          if (!bugs || bugs.length === 0) {
            logger('info', 'no bugs returned');
            
            data.message = 'No bugs returned';
            data.type = 'warning';
            data.bugs = [];
            
            rej(data);
          } else {
            logger('info', `Retrieved ${bugs.length} Bugs succesfully`);
            data.type = 'success';
            data.bugs = bugs;

            res(data);
          }
        }
      });
  });
};

module.exports.countBugs = (query) => {
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

    Bug
      .count(query, (err, count) => {
        let data = {};

        if (err) {
          logger('error', 'error counting bugs in db');

          data.message = 'error counting bugs in db';
          data.type = 'error';
          data.count = null;

          rej(data);
        } else {

          logger('info', `${count} Bugs met criteria`);

          data.type = 'success';
          data.count = count;

          res(data);
        }
      });
  });
};