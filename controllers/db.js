const mongooose = require('mongoose');

const options = {
  useMongoClient: true,
}

mongooose.Promise = global.Promise;

module.exports = function fetchDb(cb) {
  
  mongooose.connect('mongodb://localhost:27017/project-mam', options).then(
    // connection received run cb.
    () => cb(),
    // problem connecting to db, call pass error to cb.
    (err) => cb(err)
  );
};