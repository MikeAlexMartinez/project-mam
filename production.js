'use strict';

process.env.NODE_ENV = 'production';

const app = require('./app');

app.listen(3030, () => console.log('Listening for requests on port 3030...'));