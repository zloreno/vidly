require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
	winston.add(
		new winston.transports.Console({ colorize: true, prettyPrint: true })
	);
	winston.add(
		new winston.transports.File({
			filename: 'logfile.log',
		})
	);
	winston.add(
		new winston.transports.MongoDB({
			db: 'mongodb://localhost/vidly',
			level: 'info',
			options: {
				useUnifiedTopology: true,
			},
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
};
