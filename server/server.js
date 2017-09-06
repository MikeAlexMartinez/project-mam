import path from 'path';
import SourceMapSupport from 'source-map-support';
import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import vhost from 'vhost';
import virtualHosts from './vhosts.json';

import projectsApi from './api/projects';

// enable Source Map support for debugging of server soure code.
SourceMapSupport.install();

const app = express();

app.use(bodyParser.json());
app.use(express.static('static'));

app.use('/api', projectsApi);


// Virtual hosts
virtualHosts.forEach((virtualHost) => {
  const virtualHostApp = express();
  virtualHostApp.use(express.static(path.join(__dirname, virtualHost.path)));
  app.use(vhost(virtualHost.domain, virtualHostApp));
});

app.get('/admin/*', (req, res) => {
  res.sendFile(path.resolve('./static/admin/index.html'));
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});
