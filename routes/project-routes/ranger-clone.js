'use strict';

// Application data
const appData = require('../../scripts/ranger-clone-data');

const views = 'my-projects/ranger-clone/';

const allRoutes = [
  {
    method: 'get',
    route: '/ranger-clone',
    fn: function homePage(req, res) {
      const data = {
        title: 'RangerClone - Home', 
        data: appData.data,
        csrfToken: req.csrfToken()
      }
      res.render(`${views}home`, data);
    }
  }
];

module.exports = allRoutes;