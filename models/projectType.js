'use strict';

const uuidv4 = require('uuid/v4');

const db = require('../controllers/db');

const Schema = db.Schema;

const projectTypeSchema = new Schema({
  _id: {type: String, default: uuidv4 },
  name: String,
  parent: { type: String, default: null },
  detail: String,
  children: Array,
  source: String,
  createdDate: { type: Date, default: Date.now },
});

const ProjectType = db.model('ProjectType', projectTypeSchema);

module.exports = ProjectType;
