'use strict';

const views = 'my-projects/hanoi-towers/';

const allRoutes = [
  {
    method: 'get',
    route: '/hanoi-towers',
    fn: function homePage(req, res) {
        res.render(`${views}home`, {title: 'Hanoi Towers'});
    }
  }
];

module.exports = allRoutes;