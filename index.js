// modules
const express = require('express');
const winston = require('winston');
const app = express();

// require logging first just in case anything fails
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
	winston.info(`Listening on port ${port}`)
);

module.exports = server;
