const Joi = require('joi');

module.exports = function () {
	// npm i joi-object-id
	Joi.objectId = require('joi-objectid')(Joi);
};
