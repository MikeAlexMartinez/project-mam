'use strict';

const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  _id: {type: String, default: uuidv4() },
  title: { type: String, default: null },
  link: String,
  miniDetail: String,
  associatedBlogPosts: Array,
  detail: Array,
  git: String,
  real: {type: Boolean, default: true },
  favourite: { type: Boolean, default: false },
  lastUpdate: { type: Date, default: new Date() },
  createdDate: { type: Date, default: new Date() },
  public: { type: Boolean, default: false },
  pictures: Array,
  mainPicture: String,
  type: String,
  subtype: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

/*
{
	"_id" : ObjectId("599f2b6ff6d842b25232463b"),
	"title" : "ProjectMaM",
	"link" : "https://www.projectmam.com/",
	"miniDetail" : "ProjectMaM is my personal website which displays my IT project portfolio and also is where I will keep my blog posts.",
	"associatedBlogPosts" : [ ],
	"git" : "https://github.com/MikeAlexMartinez/project-mam.git",
	"real" : true,
	"favourite" : true,
	"lastUpdate" : 1503603567506,
	"createdDate" : 1503603567506,
	"public" : true,
	"pictures" : [ ],
	"mainPicture" : null
}
*/