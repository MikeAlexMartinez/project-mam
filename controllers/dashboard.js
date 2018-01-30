'use strict';

const moment = require('moment');
const async = require('async');

// My controllers
const { fetchBugs, countBugs } = require('./bugs');
const { fetchMessages, countMessages } = require('./messages');
const { fetchProjects, countProjects } = require('./projects');
const { fetchSubscribers, countSubscribers } = require('./subscribers');

// My helpers
const { lastWeek } = require('../helpers/dates');

// variable to use in tests
let date = moment(); 

// Constructs Data necessary for dashboard
module.exports.dashboard = (seed) => {
  if (process.env.NODE_ENV === 'test') {
    date = seed;
  }
  
  return new Promise((res, rej) => {
    
    async.parallel({
      bugs: getBugData,
      messages: getMessageData,
      projects: getProjectData,
      subscribers: getSubscriberData
    }, function(err, results) {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    });
  });
};

// Messages
  // total unread
  // total in last 7 days
  // top 5 open newest to oldest
function getMessageData(cb) {

  async.parallel({
    unread: (nestedCb) => {

      countMessages({ read: false })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch((err) => {
          nestedCb(err);
        });

    },
    lastWeek: (nestedCb) => {

      // clone moment to prevent mutation bugs
      const currentDate = date.clone();

      const { startDate, endDate } = lastWeek(currentDate);

      countMessages({
          startDate: new Date(startDate), 
          endDate: new Date(endDate)
        })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch(({err}) => {
          nestedCb(err);
        });
    },
    data: (nestedCb) => {

      const query = {
        limit: 5,
        select: {_id: 1, sender: 1, subject: 1, email: 1, createdDate: 1,
                 read: 1, validated: 1, important: 1, replied: 1        
        }
      };

      fetchMessages(query)
        .then(({messages}) => {
          nestedCb(null, messages);
        })
        .catch(({err}) => {
          nestedCb(err);
        });
    }
  }, function returnMessages(err, messageData) {
    if (err) {
      cb(err);
    } else {
      cb(null, messageData);
    }
  });  
}
  
// Projects
  // total public
  // top 5 projects
function getProjectData(cb) {
  
  async.parallel({
    public: (nestedCb) => {

      countProjects({ 
          public: true, 
          real: true
        })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch((err) => {
          nestedCb(err);
        });

    },
    data: (nestedCb) => {

      const query = {
        limit: 5,
        filters: {
          public: true,
          real: true
        },
        select: {
          _id: 1, 
          title: 1, 
          createdDate: 1, 
          lastUpdate: 1, 
          public: 1,
          favourite: 1, 
          git: 1        
        }
      };

      fetchProjects(query)
        .then(({projects}) => {
          nestedCb(null, projects);
        })
        .catch(({err}) => {
          nestedCb(err);
        });
    }
  }, function returnProjects(err, projectData) {
    if (err) {
      cb(err);
    } else {
      cb(null, projectData);
    }
  });  
}

// Subscribers
  // count total active and valid
  // count total not valid
  // count total new (last 7 days)
  // top 10 - 5 and 5 side by side
function getSubscriberData(cb) {
  async.parallel({
    active: (nestedCb) => {

      countSubscribers({
          active: true
        })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch(({err}) => {
          nestedCb(err);
        });

    },
    invalid: (nestedCb) => {

      countSubscribers({
          validated: false
        })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch(({err}) => {
          nestedCb(err);
        });

    },
    lastWeek: (nestedCb) => {

      // clone moment to prevent mutation bugs
      const currentDate = date.clone();
      const { startDate, endDate } = lastWeek(currentDate);

      countSubscribers({
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch(({err}) => {
          nestedCb(err);
        });
    },
    data: (nestedCb) => {

      fetchSubscribers({
          select: {
            _id: 1,
            email: 1,
            createdDate: 1,
            validated: 1,
            active: 1
          },
          limit: 10
        })
        .then(({subscribers}) => {
          nestedCb(null, subscribers);
        })
        .catch(({err}) => {
          nestedCb(err);
        });

    }
  }, function returnSubscribers(err, subscriberData) {
    if (err) {
      cb(err);
    } else {
      cb(null, subscriberData);
    }
  });
}


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

    },
    lastWeek: (nestedCb) => {

      // clone moment to prevent mutation bugs
      const currentDate = date.clone();
      
      const { startDate, endDate } = lastWeek(currentDate);

      countBugs({
          startDate: new Date(startDate), 
          endDate: new Date(endDate)
        })
        .then(({count}) => {
          nestedCb(null, count);
        })
        .catch(({err}) => {
          nestedCb(err);
        });
    },
    data: (nestedCb) => {

      const query = {
        limit: 5,
        filters: {
          open: true
        },
        select: {_id: 1, createdDate: 1, bugDescription: 1, open: 1, important: 1},
        sortDirection: 1
      };

      fetchBugs(query)
        .then(({bugs}) => {
          nestedCb(null, bugs);
        })
        .catch(({err}) => {
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

