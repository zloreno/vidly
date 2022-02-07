const mongoose = require('mongoose');
const Joi = require('joi');

// Validation of the data inputted in the database
// Schema are the rules to which the data must oblige
const genereSchema = new mongoose.Schema({
	genere: {
		type: String,
		minlength: 3,
		maxlength: 50,
		unique: true,
		required: true,
	},
});

// A model is a class that respects the rules defined in the schema
const Genere = mongoose.model('generes', genereSchema);

// Validation of the data in input
function validateGenere(req) {
	const schema = Joi.object({
		genere: Joi.string().required().min(3).max(50),
	});
	return schema.validate(req.body);
}

module.exports.genereSchema = genereSchema;
module.exports.Genere = Genere;
module.exports.validate = validateGenere;
