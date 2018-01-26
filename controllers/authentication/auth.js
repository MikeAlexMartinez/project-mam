'use strict';

const net = require('net');

// logger
const logger = require('../../winston');

// Models
const User = require('../../models/user');
const Ip = require('../../models/ip');

// helper functions
const dates = require('../../helpers/dates');

/**
 * Records IP from request in database for analysis
 * @param {Request} req 
 * @param {Response} res 
 * @param {Function} next 
 */
function captureIp(req, res, next) {
  const ipAddress = req.clientIp;
  const type = net.isIP(ipAddress);

  // find One and Update create if doesn't exist
  Ip.findOne({ip: ipAddress}, (err, ip) => {
    if (err) {
      logger('error', 'Error retrieving IP from database');

      next();
    }

    if(!ip) {
      // create ip
      const newIp = new Ip({
        ip: ipAddress,
        type: type,
        requestsToday: 1,
        requestCount: 1
      });

      newIp.save((err, newIp, numAffected) => {
        if (err) {
          logger('error', 'Error saving IP address');
          next();
        }

        next();
      });

    } else {

      // update ip
      // incremenet requetCount
      let count  = ip.requestCount + 1;
      let requestsToday;
      let lastRequest = ip.lastRequest;

      // if last request was today then increment requests today
      if (dates.match(lastRequest, new Date)) {
        requestsToday = ip.requestsToday + 1;
      } else {
        // else set to 1 
        lastRequest = new Date;
        requestsToday = 1;
      }

      // save
      ip.update({
        lastRequest: lastRequest,
        requestsToday: requestsToday,
        requestCount: count,
      }, (err, data) => {
        if (err || !data) logger('error', 'Error updating IP address');
        
        next();
      });
    }

  });

};

function isLoggedIn(req, res, next) {
  
  if( !req.session.userId ) {
    logger('info', 'admin access DENIED. No session present');

    const message = encodeURIComponent('You must login to view this page...');
    const type = encodeURIComponent('warning');

    res.redirect('/admin/login?message=' + message + '&type=' + type);

  } else {
    
    User.findById(req.session.userId)
      .exec((err, user) => {
        
        if ( err || !user ) {
          logger('info','user session not found');
          
          const message = encodeURIComponent('You must login to view this page...');
          const type = encodeURIComponent('warning');
    
          res.redirect('/admin/login?message=' + message + '&type=' + type);
          
        }
        const { username, numLogins, lastLogin } = user
        
        req.user = {
          username,
          numLogins,
          lastLogin
        }

        next();
      });
  }
};


module.exports.captureIp = captureIp;
module.exports.isLoggedIn = isLoggedIn;
