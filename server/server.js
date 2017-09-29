import path from 'path';
import SourceMapSupport from 'source-map-support';
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import projectsApi from './api/projects';

// enable Source Map support for debugging of server soure code.
SourceMapSupport.install();

const app = express();

app.use(bodyParser.json());
app.use(express.static('../static'));

/* projects api */
app.use('/api', projectsApi);

app.listen(3000, () => {
  console.log('App started on port 3000');
});
