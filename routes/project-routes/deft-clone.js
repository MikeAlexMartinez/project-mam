'use strict';

// Application data
const appData = require('../../scripts/deft-clone-data');

const views = 'my-projects/deft-clone/';

const allRoutes = [
  {
    method: 'get',
    route: '/deft-clone',
    fn: function homePage(req, res) {
        res.render(`${views}home`, {title: 'Deft - Home', data: appData.data });
    }
  }
];

module.exports = allRoutes;