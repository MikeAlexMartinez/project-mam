'use strict';

const assert = require('chai').assert;
const moment = require('moment');

const dashboard = require('../controllers/dashboard').dashboard;

describe('==== DASHBOARD ====', () => {

  let dashboardData = {};

  before((done) => {
    dashboard(moment('2018-01-30','YYYY-MM-DD'))
      .then((data) => {
        dashboardData = Object.assign(dashboardData, data);
        done();
      })
      .catch((err) => {
        console.error(err);
        process.exit();
      });
  });

  describe('-> Bug Data ->', () => {

    it('should return the number of open bugs in the database', (done) => {
      
      const {bugs} = dashboardData;
      
      assert.equal(bugs.open, 6, 
        'There should be 3 open bugs retrieved from the database'
      );

      done();
    });

    it('should return the number of open created in the last 7 days', (done) => {
      
      const {bugs} = dashboardData;
      
      assert.equal(bugs.lastWeek, 6, 
        'There should be 6 newly created bugs retrieved from the database'
      );

      done();
    });

    it('should return open bugs sorted from oldest to newest with the fields specified', (done) => {

      const {bugs} = dashboardData;

      const expectedBugs = [
        { 
          _id: 'bugger06-3c83-4b4b-9089-69362f729ae7',
          bugDescription: 'Bugging me 6.',
          open: true,
          important: false,
          createdDate: new Date('2018-01-24T12:10:02.000Z') 
        },
        { _id: 'bugger05-3c83-4b4b-9089-69362f729ae7',
          bugDescription: 'Bugging me 5.',
          open: true,
          important: false,
          createdDate: new Date('2018-01-25T12:10:02.000Z')
        },
        { _id: 'bugger04-3c83-4b4b-9089-69362f729ae7',
          bugDescription: 'Bugging me 4.',
          open: true,
          important: false,
          createdDate: new Date('2018-01-26T12:10:02.000Z')
        },
        { _id: 'bugger03-3c83-4b4b-9089-69362f729ae7',
          bugDescription: 'Bugging me 3.',
          open: true,
          important: false,
          createdDate: new Date('2018-01-27T12:10:02.000Z')
        },
        { _id: 'bugger02-3c83-4b4b-9089-69362f729ae7',
          bugDescription: 'Bugging me 2.',
          open: true,
          important: false,
          createdDate: new Date('2018-01-28T12:10:02.000Z')
        }
      ];

      assert.equal(bugs.data.length, 5, 'should return oldest 5 open items');

      bugs.data.forEach((bug, i) => {
        const expectedBug = expectedBugs[i];
        Object.keys(expectedBug).forEach(key => {
          assert.deepEqual(bug[key], expectedBug[key], `the value at ${key} should match`);
        });

      });
      
      done();
    });

  });

    describe('-> Messages Data ->', () => {
      
      it('should return the number of unread messages in the database', (done) => {
        
        const {messages} = dashboardData;

        assert.equal(messages.unread, 19, 
          'There should be 19 unread messages retrieved from the database'
        );
  
        done();
      });
  
      it('should return the number of messages created in the last 7 days', (done) => {
        
        const {messages} = dashboardData;
        
        assert.equal(messages.lastWeek, 3, 
          'There should be 3 newly created messages retrieved from the database'
        );
  
        done();
      });
  
      it('should return messages sorted DESC with the fields specified', (done) => {
  
        const {messages} = dashboardData;
              
        const expectedMessages = [ 
          { 
            _id: 'sender01-3c83-4b4b-9089-69362f729ae7',
            sender: 'Sender-1',
            email: 'test1@mail.com',
            replied: true,
            important: true,
            validated: true,
            read: false,
            createdDate: new Date('2018-01-29T12:10:02.000Z'),
            subject: 'Hello One' 
          },
          { 
            _id: 'sender02-3c83-4b4b-9089-69362f729ae7',
            sender: 'Sender-2',
            email: 'test2@mail.com',
            replied: false,
            important: false,
            validated: true,
            read: false,
            createdDate: new Date('2018-01-28T12:10:02.000Z'),
            subject: 'Hello Two' 
          },
          { _id: 'sender03-3c83-4b4b-9089-69362f729ae7',
            sender: 'Sender-3',
            email: 'test3@mail.com',
            replied: false,
            important: true,
            validated: true,
            read: false,
            createdDate: new Date('2018-01-27T12:10:02.000Z'),
            subject: 'Hello three' 
          },
          { _id: 'sender06-3c83-4b4b-9089-69362f729ae7',
            sender: 'Sender-6',
            email: 'test6@mail.com',
            replied: true,
            important: true,
            validated: true,
            read: false,
            createdDate: new Date('2018-01-20T13:10:02.000Z'),
            subject: 'Hello Six' 
          },
          { _id: 'sender07-3c83-4b4b-9089-69362f729ae7',
            sender: 'Sender-7',
            email: 'test7@mail.com',
            replied: false,
            important: false,
            validated: true,
            read: false,
            createdDate: new Date('2018-01-19T12:10:02.000Z'),
            subject: 'Hello Seven' 
          } 
        ];
  
        assert.equal(messages.data.length, 5, 'should return items in latest week');
  
        messages.data.forEach((message, i) => {
          const expectedMessage = expectedMessages[i];
          Object.keys(expectedMessage).forEach(key => {
            assert.deepEqual(message[key], expectedMessage[key],`the value at ${key} should match`);
          });
  
        });
        
        done();
      });

  });

  describe('-> Projects Data ->', () => {
    
    it('should return the number of public projects', (done) => {
      
      const {projects} = dashboardData;

      assert.equal(projects.public, 5, 
        'There should be 5 public projects retrieved from the database'
      );

      done();
    });

    it('should return messages sorted DESC with the fields specified', (done) => {

      const {projects} = dashboardData;
            
      const expectedProjects = [ 
        {
          '_id' : 'ai1cca36-3d7a-40f4-8f06-ae03cc22f045',
          'title' : 'Project MaM',
          'git' : 'https://github.com/MikeAlexMartinez/project-mam',
          'favourite' : true,
          'lastUpdate' : new Date(2018, 0, 11),
          'createdDate' : new Date(2017, 12, 23),
          'public' : true,
        },
        {
          '_id' : 'deftca36-3d7a-40f4-8f06-ae03cc22f045',
          'title' : 'Deft',
          'git' : 'https://github.com/MikeAlexMartinez/deft-clone',
          'favourite' : true,
          'lastUpdate' : new Date(2018, 0, 10),
          'createdDate' : new Date(2017, 12, 21),
          'public' : true,
        },
        {
          '_id' : 'ranger36-3d7a-40f4-8f06-ae03cc22f045',
          'title' : 'Ranger',
          'git' : 'https://github.com/MikeAlexMartinez/ranger-clone',
          'favourite' : true,
          'lastUpdate' : new Date(2018, 0, 10),
          'createdDate' : new Date(2017, 12, 15),
          'public' : true,
        },
        {
          '_id' : 'minifo36-3d7a-40f4-8f06-ae03cc22f045',
          'title' : 'Minifolio',
          'git' : 'https://github.com/MikeAlexMartinez/minifolio-clone',
          'favourite' : true,
          'lastUpdate' : new Date(2018, 0, 10),
          'createdDate' : new Date(2017, 12, 8),
          'public' : true
        },
        {
          '_id' : 'resume36-3d7a-40f4-8f06-ae03cc22f045',
          'title' : 'Resume',
          'git' : 'https://github.com/MikeAlexMartinez/resume-clone',
          'favourite' : true,
          'lastUpdate' : new Date(2018, 0, 9),
          'createdDate' : new Date(2017, 12, 1),
          'public' : true,
        }
      ];

      assert.equal(projects.data.length, 5, 'should return items in latest week');

      projects.data.forEach((project, i) => {
        const expectedProject = expectedProjects[i];
        Object.keys(expectedProject).forEach(key => {
          assert.deepEqual(project[key], expectedProject[key],`the value at ${key} should match`);
        });

      });
      
      done();
    });

  });

  describe('-> Subscribers Data ->', () => {
    
    it('should return the number of active subscribers', (done) => {
      
      const {subscribers} = dashboardData;

      assert.equal(subscribers.active, 10, 
        'There should be 10 active subscribers retrieved from the database'
      );

      done();
    });

    it('should return the number of invalidated subscribers', (done) => {
      
      const {subscribers} = dashboardData;

      assert.equal(subscribers.invalid, 9, 
        'There should be 9 invalid subscribers retrieved from the database'
      );

      done();
    });

    it('should count the number of subscribers from the last week', (done) => {
      
      const {subscribers} = dashboardData;

      assert.equal(subscribers.lastWeek, 7, 
        'There should be 7 subscribers from the last week retrieved from the database'
      );

      done();
    });

    it('should return 10 newest subscribers', (done) => {

      const {subscribers} = dashboardData;
            
      const expectedSubscribers = [ 
        {
          _id: 'subscri01-3c83-4b4b-9089-69362f729ae7',
          email: 'test1@mail.com',
          createdDate: new Date(2018,0,30),
          validated: false,
          active: false,
        },
        {
          _id: 'subscri02-3c83-4b4b-9089-69362f729ae7',
          email: 'test2@mail.com',
          createdDate: new Date(2018,0,29),
          validated: true,
          active: true,
        },
        {
          _id: 'subscri03-3c83-4b4b-9089-69362f729ae7',
          email: 'test3@mail.com',
          createdDate: new Date(2018,0,28),
          validated: false,
          active: true,
        },
        {
          _id: 'subscri04-3c83-4b4b-9089-69362f729ae7',
          email: 'test4@mail.com',
          createdDate: new Date(2018,0,27),
          validated: false,
          active: true,
        },
        {
          _id: 'subscri05-3c83-4b4b-9089-69362f729ae7',
          email: 'test5@mail.com',
          createdDate: new Date(2018,0,26),
          validated: false,
          active: true,
        },
        {
          _id: 'subscri06-3c83-4b4b-9089-69362f729ae7',
          email: 'test6@mail.com',
          createdDate: new Date(2018,0,25),
          validated: false,
          active: true,
        },
        {
          _id: 'subscri07-3c83-4b4b-9089-69362f729ae7',
          email: 'test7@mail.com',
          createdDate: new Date(2018,0,24),
          validated: false,
          active: true,
        },
        {
          _id: 'subscri08-3c83-4b4b-9089-69362f729ae7',
          email: 'test8@mail.com',
          createdDate: new Date(2018,0,23),
          validated: false,
          active: true,
        },
        {
          _id: 'subscri09-3c83-4b4b-9089-69362f729ae7',
          email: 'test9@mail.com',
          createdDate: new Date(2018,0,22),
          validated: true,
          active: true,
        },
        {
          _id: 'subscri10-3c83-4b4b-9089-69362f729ae7',
          email: 'test10@mail.com',
          createdDate: new Date(2018,0,21),
          validated: false,
          active: true
        }
      ];

      assert.equal(subscribers.data.length, 10, 'should return items 10 subscribers');

      subscribers.data.forEach((subscriber, i) => {
        const expectedSubscriber = expectedSubscribers[i];
        Object.keys(expectedSubscriber).forEach(key => {
          assert.deepEqual(subscriber[key], expectedSubscriber[key],`the value at ${key} should match`);
        });

      });
      
      done();
    });

  });
});