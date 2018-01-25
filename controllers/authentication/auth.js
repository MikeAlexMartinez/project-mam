'use strict';


function isLoggedIn(req, res, next) {
  
  next();
};


module.exports.isLoggedIn = isLoggedIn;