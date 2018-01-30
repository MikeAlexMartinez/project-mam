'use strict';

const logger = require('../winston');
const Project = require('../models/project');
const createArray = require('../helpers/filter.js').createArray;

module.exports.fetchProjects = (query) => {
  return new Promise((res, rej) => {
    
    let { startDate=null, 
          endDate=null,
          tags,
          filters={},
          sort='createdDate',
          sortDirection=-1,
          limit=10, 
          skip,
          page=1,
          select={},
        } = query;
    
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

    skip = (page - 1) * limit;

    // parse tags provided (if any)
    if (tags) {
      if (typeof tags === 'string') {
        tags = { '$all': createArray(tags)};
      }

      filter.tags = tags;
    }

    // parse filters provided (if any)
    if (filters) {
      Object.keys(filters).forEach((key) => {
        if (filters[key]) {
          filter[key] = filters[key];
        }
      });
    }

    Project
      .find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .select(select)
      .exec((err, projects) => {
        let data = {};

        if (err) {
          logger('error', 'error retrieving projects from db');
          
          data.message = 'error retrieving projects from db';
          data.type = 'error';
          data.projects = [];

          rej(data);
        } else {
 
          if (!projects || projects.length === 0) {
            logger('info', 'no projects returned');
            
            data.message = 'No projects returned';
            data.type = 'error';
            data.projects = [];
            
            rej(data);
          } else {
            const message = `Project item(s) fetched successfully`;
            logger('info', message);
            
            data.message = message;
            data.type = 'success';
            data.projects = projects;
    
            res(data);
          }
        }
          
      });
  });
};

module.exports.countProjects = (query) => {
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

    Project
      .count(query, (err, count) => {
        let data = {};

        if (err) {
          logger('error', 'error counting projects in db');

          data.message = 'error counting projects in db';
          data.type = 'error';
          data.count = null;
          data.err = err;

          rej(data);
        } else {

          logger('info', `${count} Projects met criteria`);

          data.type = 'success';
          data.count = count;

          res(data);
        }
      });
  });
};