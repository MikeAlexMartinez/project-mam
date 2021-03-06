'use strict';

const uuidv4 = require('uuid/v4');

const db = require('../controllers/db');

const Schema = db.Schema;

const projectSchema = new Schema({
  _id: {type: String, default: uuidv4 },
  title: { type: String, default: null },
  lastUpdate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
  link: String, 
  devlink: String,
  miniDetail: String,
  associatedBlogPosts: { type: Array, default: [] },
  detail: { type: Array, default: [] },
  git: String,
  tags: { type: Array, default: [] },
  pictures: { type: Array, default: [] },
  mainPicture: String,
  type: String,
  subtype: String,
  real: {type: Boolean, default: true },
  favourite: { type: Boolean, default: false },
  public: { type: Boolean, default: false }
});

const Project = db.model('Project', projectSchema);

module.exports = Project;