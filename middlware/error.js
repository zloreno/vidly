const winston = require('winston');

function error(err, req, res, next) {
	// Option 1
	//winston.log('error', err.message);
	// Option 2 (with metadata)
	logger.error(err.message, err);
	// error
	// warning
	// information about the application
	// verbose
	// debug -> writing debug information
	// silly

	res.status(500).send('Internal Server Error Lollo');
}

module.exports = error;
