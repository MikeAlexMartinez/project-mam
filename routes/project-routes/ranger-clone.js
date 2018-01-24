'use strict';

// Application data
const appData = require('../../scripts/ranger-clone-data');

const views = 'my-projects/ranger-clone/';

const allRoutes = [
  {
    method: 'get',
    route: '/ranger-clone',
    fn: function homePage(req, res) {
        res.render(`${views}home`, {title: 'RangerClone - Home', data: appData.data });
    }
  }
]

module.exports = allRoutes;