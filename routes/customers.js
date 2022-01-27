// isGold -> Boolean
// name -> String
// phone -> String

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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
	isGold: { type: Boolean, required: true },
	name: { type: String, required: true },
	phone: { type: String, required: true, minlength: 5, maxlength: 20 },
});

const Customer = mongoose.model('customers', customerSchema);

//---------------------------------------------------------------- GET
router.get('/', async (req, res) => {
	const customer = await Customer.find();
	res.send(customer);
});

router.get('/:id', async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	if (!customer)
		return res.status(404).send(`Customer with ID ${req.params.id} not found`);
	res.send(customer);
});

//---------------------------------------------------------------- POST
router.post('/', async (req, res) => {
	const { error } = validateCustomers(req);
	if (error) return res.status(400).send(error.details[0].message);

	let customer = new Customer({
		isGold: req.body.isGold,
		name: req.body.name,
		phone: req.body.phone,
	});
	try {
		customer = await customer.save();
		return res.send(customer);
	} catch (err) {
		return res.status(400).send(err);
	}
});

//---------------------------------------------------------------- PUT
router.put('/:id', async (req, res) => {
	const { error } = validateCustomers(req);
	if (error) return res.status(400).send(error.details[0].message);

	Customer.findOneAndUpdate(
		{ _id: req.params.id },
		{ $set: { isGold: isGold, name: name, phone: phone } }
	).exec(function (err, book) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send(customer);
		}
	});
});

//---------------------------------------------------------------- DELETE

//---------------------------------------------------------------- Exports
module.exports = router;
