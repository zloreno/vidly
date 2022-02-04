// modules
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
winston.add(
	new winston.transports.File({
		filename: 'logfile.log',
	})
);
winston.add(
	new winston.transports.MongoDB({
		db: 'mongodb://localhost/vidly',
		level: 'error',
	})
);

// When we have an exception in the Node Environment but nowhere to handle such error
process.on('uncaughtException', (ex) => {
	console.log('We got an uncaught exception');
	winston.error(ex.message, ex);
});

throw new Error('Something failed during startup');

const config = require('config');
if (!config.get('jwtPrivateKey')) {
	console.log(`FATAL ERROR: jwtPrivateKey is not defined`);
	process.exit(1);
}
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const app = express();

// routes
const generes = require('./routes/genres');
const homepage = require('./routes/homepage');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

// middleware
// We could either use this custom-made middleware for handling errors
const error = require('./middlware/error');
// Or express async error npm package

// functions
// npm i joi-object-id
Joi.objectId = require('joi-objectid')(Joi);

// connect to db
mongoose
	.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to mongoDB'))
	.catch((err) => console.log(`Error: ${err}`));

//middleware
app.use(express.json());
//app.use(logger);

// routing
// For every request that points towards this suffix, use that router
app.use('/api/generes', generes);
app.use('/', homepage);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Use express error middleware as the last middleware
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
