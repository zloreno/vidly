// modules
const mongoose = require('mongoose');
const express = require('express');
const app = express();
// routes
const generes = require('./routes/genres');
const homepage = require('./routes/homepage');
const customers = require('./routes/customers');
const movies = require('./routes/movies');

// middleware
const logger = require('./middlware/logger');
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
