'use strict';

const db = require('../controllers/db');

const Schema = db.Schema;

const projectTypeSchema = new Schema({
  name: String,
  parent: { type: String, default: null },
  detail: String,
  children: Array,
  source: String,
  createdDate: { type: Date, default: Date.now },
});

const ProjectType = db.model('ProjectType', projectTypeSchema);

module.exports = ProjectType;