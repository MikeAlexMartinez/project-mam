import mongoose, { Schema } from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

const db = mongoose.createConnection('localhost', 'project-mam');

const ProjectSchema = mongoose.Schema({
  title: { type: String, required: true, trim: true },
  link: { type: String, required: false, trim: true },
  miniDetail: { type: String, required: true, trim: true },
  associatedBlogPosts: [Number],
  git: { type: String, required: false, trim: true },
  favourite: { type: Boolean, required: true, default: false },
  lastUpdate: { type: Date, required: true, default: Date.now() },
  createdDate: { type: Date, required: true, default: Date.now() },
  public: { type: Boolean, required: true, default: false },
  pictures: [String],
  mainPicture: { type: String, required: false, trim: true },
  _id: { type: Schema.Types.ObjectId, required: true, default: new ObjectId() },
});

const Project = db.model('project', ProjectSchema);

export default Project;
