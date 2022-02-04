const mongoose = require('mongoose');
const winston = require('winston');
require('winston-mongodb');

const logger = winston.loggers.add('mongoLog', {
	transports: [
		new winston.transports.MongoDB({
			db: 'mongodb://localhost/vidly',
			collection: 'database',
			level: 'info',
		}),
	],
});

module.exports = function () {
	mongoose
		.connect('mongodb://localhost/vidly')
		.then(() => logger.info('Connected to mongoDB'));
};
