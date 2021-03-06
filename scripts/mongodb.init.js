'use strict';

/**
 * To Do...
 * 
 * swallow console statements during mocha tests before().
 * 
 */

const path = require('path');

const MongoClient = require('mongodb').MongoClient;
const assert = require('chai').assert;
const async = require('async');

const projectTypes = require('./db/projectTypes');
const projects = require('./db/projects');
const messages = require('./db/messages');
const subscribers = require('./db/subscribers');
const bugs = require('./db/bugs');

const args = process.argv;

if (path.parse(args[1]).name === '_mocha') {
  console.log("Running in test mode...");
}

if (path.parse(args[1]).name === 'mongodb.init' ) {
  
  require('dotenv').config();

  let colsToRefresh = [];

  if (args[2]) {
    colsToRefresh = colsToRefresh.concat(args[2].split(','));
  }
  
  refreshCollections(colsToRefresh)
    .then(() => {
      console.log('Database Refresh Complete!');
    })
    .catch((err) => {
      console.error(err);
    });
}

function refreshCollections(cols) 
{
  return new Promise((res, rej) => {
    console.log("Running");
    
    let collectionsToInsert = [
      {
        name: 'projecttypes',
        data: projectTypes
      },
      {
        name: 'projects',
        data: projects
      },
      {
        name: 'messages',
        data: messages
      },
      {
        name: 'subscribers',
        data: subscribers
      },
      {
        name: 'bugs',
        data: bugs
      }
    ];
    
    if (cols.length > 0) {

      collectionsToInsert = collectionsToInsert.filter((v) => {
        return cols.indexOf(v.name) !== -1;
      });
    }

    let remainingCollections = collectionsToInsert.length;
    
    const q = async.queue(function(colToInsert, cb) {
      console.log(colToInsert.name);
      
      refreshCollection(colToInsert)
        .then(cb(null, colToInsert.name))
        .catch((err) => {
          cb(err);
        });
      
    });
    
    q.drain = function() {
      console.log('All collections have been created');
    };
    
    q.push(collectionsToInsert, function(err, col) {
      if (err) {
        console.error(err);
        rej(err);
      }
      
      console.log(`Inserting into ${col}`);
    });
    
    /**
     * Creates a new collection or refreshes an existing collection in the target db
     * @param {Object} colToInsert - An object defining the 
     *   collection name and the data to insert
     * @return {Promise}
     */
    function refreshCollection(colToInsert) {
      return new Promise((res, rej) => {
        const url = `mongodb://${process.env.DB_CLIENT}:${process.env.DB_CLIENT_PWD}@127.0.0.1:27017/project-mam`;
        
        MongoClient.connect(url, function(err, db) {
          // check for error if no error continue
          assert.equal(null, err);
          
          const colToCreate = colToInsert.name;
          const data = colToInsert.data;
          
          db.collection(colToCreate, {strict: true}, function(err) {
            
            // If no error collection exists;
            if(!err) {
              console.log(`Dropping ${colToCreate}`);
              
              // drop collection then recreate it from scratch
              db.dropCollection(colToCreate)
                .then(createCollection(colToCreate, data, db))
                .then(() => {
                  res(null);
                })
                .catch((err) => {
                  console.error(err);
                  rej(err);
                });
              
            } else {
              createCollection(colToCreate, data, db);
            }
            
          });
        });
      });
    }
    
    /**
     * creates or refreshes a mongodb collection in the target database
     * @function
     * @param {String} colToCreate - The name of the collection
     * @param {Array} data - data to insert into the new collection
     * @param {Db} db - represents the db instance returned from a mongodb connection callback
     */
    function createCollection(colToCreate, data, db) {
      return new Promise((res, rej) => {
        console.log(`Creating the ${colToCreate} collection...`);
        
        db.createCollection(colToCreate, function assessCollection(err, col) {
          if(err) {
            rej(err);
          }
          
          col.insertMany(data, {w: 1}, function checkInserted(err, result) {
            if (err) {
              rej(err);
            }
            
            try {
              assert.equal(data.length, result.result.n, 
                `Expected ${data.length} items to be inserted`);
            }
            catch (err) {
              rej(err);
            }
            
            console.log(`Inserted ${result.insertedCount} item(s) into ${col.collectionName}.`);
            
            
            db.close();
            
            decrement();
            res(null);
          });
        });
      });
    }
    
    function decrement() {
      remainingCollections--;

      if ( remainingCollections === 0) {
        res();
      }
    }
  });
}

module.exports = refreshCollections;