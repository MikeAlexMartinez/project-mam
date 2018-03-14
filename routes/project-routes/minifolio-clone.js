'use strict';

const appData = require('../../scripts/minifolio-clone-data');

const views = 'my-projects/minifolio-clone/';

const allRoutes = [
  {
    method: 'get',
    route: '/minifolio-clone/contact',
    fn: function contactPage(req, res) {

      const data = {
        title: "Minifolio - Contact", 
        socialItems: appData.socialItems, 
        status: "null",
        csrfToken: req.csrfToken()
      };

      res.render(`${views}contact`, data);
    }
  },
  {
    method: 'get',
    route: '/minifolio-clone/about',
    fn: function contactPage(req, res) {
      
      const data = {
        title: "Minifolio - About", 
        socialItems: appData.socialItems, 
        status: "null",
        csrfToken: req.csrfToken()
      };

      res.render(`${views}about`, data);
    },
  },
  {
    method: 'get',
    route: '/minifolio-clone/',
    fn: function homePage(req, res) {
    
      const top = appData.projects.filter((v) => v.section === 'top');
      const bottom = appData.projects.filter((v) => v.section === 'bottom'); 

      const data = { 
        projectsTop: top, 
        projectsBottom: bottom, 
        socialItems: 
        appData.socialItems, 
        title: "Minifolio - Home",
        csrfToken: req.csrfToken()
      };
    
      res.render(`${views}home`, data );
    }
  }
];

module.exports = allRoutes;