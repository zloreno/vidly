// Name, email (unique), pw
const mongoose = require('mongoose');
const Joi = require('joi');
const { string } = require('joi');

function validateUser(req) {
	const schema = Joi.object({
		name: Joi.string().min(2).max(255).required(),
		email: Joi.string().min(2).max(255).required().email(),
		password: Joi.string().min(2).max(2048).required(),
	});
	return schema.validate(req.body);
}

// Validation of the data in input
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: 2,
		maxlength: 255,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		minlength: 2,
		maxlength: 255,
		required: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		minlength: 2,
		maxlength: 2048,
		required: true,
		trim: true,
	},
});

const User = mongoose.model('user', userSchema);

module.exports.User = User;
module.exports.validate = validateUser;
