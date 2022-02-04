// modules
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();

// require logging first just in case anything fails
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
	console.log(`FATAL ERROR: jwtPrivateKey is not defined`);
	process.exit(1);
}

// functions
// npm i joi-object-id
Joi.objectId = require('joi-objectid')(Joi);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
