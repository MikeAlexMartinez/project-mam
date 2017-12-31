const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectTypeSchema = new Schema({
  name: String,
  parent: { type: String, default: null },
  detail: String,
  children: Array,
  source: String
});

const ProjectType = mongoose.model('ProjectType', projectTypeSchema);

module.exports = ProjectType;