// modules
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const config = require('config');
const Joi = require('joi');
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
	console.log(`FATAL ERROR: jwtPrivateKey is not defined`);
	process.exit(1);
}

winston.add(
	new winston.transports.File({
		filename: 'logfile.log',
	})
);
winston.add(
	new winston.transports.MongoDB({
		db: 'mongodb://localhost/vidly',
		level: 'info',
	})
);

// When we have an exception in the Node Environment but nowhere to handle such error
// Works only where there are NOT promises involved
process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, '\n\nUnhandled Rejection at Promise:\n', p);
		winston.error(reason, reason);
		process.exit(1);
	}) //winston.handleExceptions( new winston.transports.File({filename: 'uncaughtExceptions.log}))
	.on('uncaughtException', (err) => {
		console.error(err, 'Uncaught Exception thrown');
		winston.error(err.message, err);
		process.exit(1);
	});

// functions
// npm i joi-object-id
Joi.objectId = require('joi-objectid')(Joi);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
