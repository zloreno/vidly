const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
require('winston-mongodb');
const db = config.get('db');

const logger = winston.loggers.add('mongoLog', {
	transports: [
		new winston.transports.MongoDB({
			db: db,
			options: {
				useUnifiedTopology: true,
			},
			collection: 'database',
			level: 'info',
		}),
	],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({
			format: winston.format.simple(),
		})
	);
}

module.exports = function () {
	mongoose
		.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => logger.info(`Connected to ${db}`));
};
