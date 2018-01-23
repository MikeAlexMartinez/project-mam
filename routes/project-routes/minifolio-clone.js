'use strict';

const appData = require('../../scripts/minifolio-clone-data');

const views = 'my-projects/minifolio-clone/';

const allRoutes = [
  {
    method: 'get',
    route: '/contact',
    fn: function contactPage(req, res) {
      res.render(`${views}contact`, { title: "Minifolio - Contact", socialItems: appData.socialItems, status: "null"});
    }
  },
  {
    method: 'get',
    route: '/about',
    fn: function contactPage(req, res) {
      res.render(`${views}about`, { title: "Minifolio - About", socialItems: appData.socialItems});
    },
  },
  {
    method: 'get',
    route: '/',
    fn: function homePage(req, res) {
    
      const top = appData.projects.filter((v) => v.section === 'top');
      const bottom = appData.projects.filter((v) => v.section === 'bottom'); 
    
      res.render(`${views}home`, { projectsTop: top, projectsBottom: bottom, socialItems: appData.socialItems, title: "Minifolio - Home"});
    }
  }
];

module.exports = allRoutes;