'use strict';

const routes = [
  {
    method: 'get',
    route: '/',
    fn: function homePage(req, res) {
      res.render('my-projects/resume-clone/home', {title: 'Resume'});
    }
  },
];

module.exports = routes; 