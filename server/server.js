import SourceMapSupport from 'source-map-support';
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';

/* Routing */
import projectsApi from './api/projects';
import blogRoutes from './routes/blog';
import projectRoutes from './routes/projects';


// enable Source Map support for debugging of server soure code.
SourceMapSupport.install();

const app = express();

app.use(bodyParser.json());
app.use(express.static('../static'));

/* projects api */
app.use('/api', projectsApi);

/* website routing */
app.use('/projects', projectRoutes);
app.use('/blog', blogRoutes);

/* 404 default */


app.listen(3000, () => {
  console.log('App started on port 3000');
});
