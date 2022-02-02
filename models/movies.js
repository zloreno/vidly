const mongoose = require('mongoose');
const Joi = require('joi');
const { genereSchema } = require('./generes');

// Validation of the data in input
function validateMovie(req) {
	const schema = Joi.object({
		title: Joi.string().required(),
		genereId: Joi.objectId().required(),
		numberInStock: Joi.number().required(),
		dailyRentalRate: Joi.number(),
	});
	return schema.validate(req.body);
}

// Validation of the data in input
const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		minlength: 2,
		maxlength: 255,
	},
	genere: { type: genereSchema, required: true },
	numberInStock: { type: Number, required: true, min: 0, max: 255 },
	dailyRentalRate: { type: Number, required: true, min: 0, max: 255 },
});

const Movie = mongoose.model('movies', movieSchema);

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
