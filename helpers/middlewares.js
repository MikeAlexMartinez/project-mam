'use strict';

module.exports.createSource = (req, res, next) => {
  req.source = req.hostname + req.originalUrl;
  next();
};

module.exports.noCache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
};