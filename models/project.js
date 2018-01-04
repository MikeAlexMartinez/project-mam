'use strict';

const uuidv4 = require('uuid/v4');

const db = require('../controllers/db');

const Schema = db.Schema;

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
  lastUpdate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
  public: { type: Boolean, default: false },
  pictures: Array,
  mainPicture: String,
  type: String,
  subtype: String
});

const Project = db.model('Project', projectSchema);

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