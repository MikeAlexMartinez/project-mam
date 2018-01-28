'use strict';

// Application data
const appData = require('../../scripts/deft-clone-data');

const views = 'my-projects/deft-clone/';

const allRoutes = [
  {
    method: 'get',
    route: '/deft-clone',
    fn: function homePage(req, res) {

      const data = {
        title: 'Deft - Home', 
        data: appData.data,
        csrfToken: req.csrfToken()
      };

      res.render(`${views}home`, data);
    }
  }
];

module.exports = allRoutes;