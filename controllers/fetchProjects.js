'use strict';

const logger = require('../winston');
const Project = require('../models/project');
const createArray = require('../helpers/filter.js').createArray;

module.exports.fetchProjects = (req, res) => {
  return new Promise((res, rej) => {
    
    let { startDate, 
          endDate,
          tags,
          sort='createdDate',
          sortDirection=1,
          limit=20, 
          skip,
          page=1
        } = req.query;
    
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
    if (tags) {
      filter.tags = createArray(tags);
    }

    Project
      .find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sortBy)
      .exec((err, projects) => {
        if (err) {
          logger('error', 'error retrieving projects from db');
          rej(err);
        }

        if (!projects || projects.length === 0) {
          logger('info', 'no projects returned');
          rej(err);
        }

        const message = `Project item(s) fetched successfully`;
        logger('info', message);
        
        const response = {
          message: message,
          type: 'success',
          projects: projects
        };

        res(response);
      });
  });
};