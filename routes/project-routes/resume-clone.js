'use strict';

const routes = [
  {
    method: 'get',
    route: '/resume-clone',
    fn: function homePage(req, res) {

      const data = {
        title: 'Resume',
        scriptNonce: res.locals.nonce
      };
      
      console.log(data.scriptNonce);

      res.render('my-projects/resume-clone/home', data);
    }
  },
];

module.exports = routes; 