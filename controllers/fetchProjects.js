'use strict';

const rp = require('request-promise');

const logger = ('../winston');
const api = 'http://localhost:3030/api/projects';

module.exports.fetchProjects = (req, res) => {
  return new Promise((res, rej) => {

    let data = {
      location: 'projects',
      filtered: false,
      projects: []
    },
    query;
    
    // check for query parameters
    if (req.query) {
      data.filtered = true;
      query = req.url.split('?')[1];
    }
    
    const options = rpOptions(query);
    
    rp(options)
      .then((resp) => {
        
        data.projects = resp.data;
        
        res(data);
      })
      .catch((err) => {
        logger.error(err);
        
        data.error = 'Unable to retrieve projects';
        
        res(data.projects = []);
      });
    

    function rpOptions(qp) {
      return {
        method: 'GET',
        uri: `${qp ? api + '?' + qp : api}`,
        json: true,
      };
    }

  });
};