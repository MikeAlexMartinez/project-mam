'use strict';

const moment = require('moment');
const async = require('async');

// My controllers
const { fetchBugs, countBugs } = require('./bugs');
const { fetchMessages, countMessages } = require('./messages');
const { fetchProjects, countProjects } = require('./projects');
const { fetchSubscribers, countSubscribers } = require('./subscribers');

// Constructs Data necessary for dashboard
module.exports.dashboard = () => {
  return new Promise((res, rej) => {
    
    async.parallel({
      bugs: getBugData
    }, function(err, results) {
      if (err) {
        rej(err);
      } else {
        console.log(results);
        res(results);
      }
    });
  });
};

// Messages
  // total unread
  // total in last 7 days
  // top 5 open newest to oldest
  
// Projects
  // total public
  // visits? -- later
  
// Subscribers
  // total active and valid
  // total not valid
  // total new (last 7 days)
  // top 10 - 5 and 5 side by side

// Bugs
  // total open
  // total in last 7 days
  // top 5 open oldest to newest
function getBugData(cb) {

  async.parallel({
    open: (nestedCb) => {

      countBugs({ open: true })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch((err) => {
          nestedCb(err);
        });

    }
  }, function returnBugs(err, bugData) {
    if (err) {
      cb(err);
    } else {
      cb(null, bugData);
    }
  });
}

