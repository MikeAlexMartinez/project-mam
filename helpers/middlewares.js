'use strict';

module.exports.createSource = (req, res, next) => {
  req.source = req.hostname + req.originalUrl;
  next();
};
