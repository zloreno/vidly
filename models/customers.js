const mongoose = require('mongoose');
const Joi = require('joi');

// Validation of the data in input
function validateCustomers(req) {
	const schema = Joi.object({
		isGold: Joi.boolean().required(),
		name: Joi.string().required(),
		phone: Joi.string().required().min(5),
	});
	return schema.validate(req.body);
}

// Validation of the data in input
const customerSchema = new mongoose.Schema({
	isGold: { type: Boolean, required: true, default: false },
	name: { type: String, required: true },
	phone: { type: String, required: true, minlength: 5, maxlength: 20 },
});

const Customer = mongoose.model('customers', customerSchema);

module.exports.Customer = Customer;
module.exports.validate = validateCustomers;
