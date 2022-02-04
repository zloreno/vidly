// routes
const express = require('express');

// Routes
const generes = require('../routes/genres');
const homepage = require('../routes/homepage');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

// Middleware
const error = require('../middlware/error');
// We could either use this custom-made middleware for handling errors
// Or express async error npm package

module.exports = function (app) {
	app.use(express.json());
	app.use('/api/generes', generes);
	app.use('/', homepage);
	app.use('/api/customers', customers);
	app.use('/api/movies', movies);
	app.use('/api/rentals', rentals);
	app.use('/api/users', users);
	app.use('/api/auth', auth);
	// Use express error middleware as the last middleware
	app.use(error);
};
