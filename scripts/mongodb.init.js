'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('chai').assert;

const projectTypes = require('./projectTypes').projectTypes;

const url = 'mongodb://localhost:27017/project-mam';

const ptypeLength = projectTypes.length;

MongoClient.connect(url, function(err, db) {
  // check for error if no error continue
  assert.equal(null, err);
  
  const colToCreate = 'projecttypes';

  db.collection(colToCreate, {strict: true}, function(err, col) {
    
    // If no error collection exists;
    if(!err) {
      console.log(`Dropping ${colToCreate}`);
      
      // drop collection then recreate it from scratch
      db.dropCollection(colToCreate)
        .then(createCollection(colToCreate, db))
        .catch((err) => {
          console.error(err);
        });
    
    } else {
      createCollection(colToCreate, db);
    }

  });
});

/**
 * creates or refreshes a mongodb collection in the target database
 * @function
 * @param {String} colToCreate - The name of the collection
 * @param {Db} db - represents the db instance returned from a mongodb connection callback
 */
function createCollection(colToCreate, db) {

  console.log(`Creating the ${colToCreate} collection...`);

  db.createCollection(colToCreate, function assessCollection(err, col) {
    assert.equal(null, err);

    col.insertMany(projectTypes, {w: 1}, function checkInserted(err, res) {
      assert.equal(null, err)
      assert.equal(ptypeLength, res.result.n);

      console.log(`Inserted ${res.insertedCount} item(s) into ${col.collectionName}.`);

      db.close();
    });
  });
}

