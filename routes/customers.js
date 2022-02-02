const mongoose = require('mongoose');
const { Customer, validate } = require('../models/customers');
const express = require('express');
const router = express.Router();

//---------------------------------------------------------------- GET
router.get('/', async (req, res) => {
	const customer = await Customer.find().sort('name');
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
	const { error } = validate(req);
	if (error) return res.status(400).send(error.details[0].message);

	const customer = new Customer({
		isGold: req.body.isGold,
		name: req.body.name,
		phone: req.body.phone,
	});
	try {
		await customer.save();
		return res.send(customer);
	} catch (err) {
		return res.status(400).send(err);
	}
});

//---------------------------------------------------------------- PUT
router.put('/:id', async (req, res) => {
	const oldCustomer = await Customer.findById(req.params.id);
	let customer = await Customer.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				isGold: req.body.isGold || oldCustomer.isGold,
				name: req.body.name || oldCustomer.name,
				phone: req.body.phone || oldCustomer.params,
			},
		},
		{ new: true }
	);
	// Missing Joi validator
	if (!customer)
		return res.status(404).send(`Customer with ID ${req.params.id} not found`);

	return res.send(customer);
});
//---------------------------------------------------------------- DELETE
router.delete('/:id', async (req, res) => {
	const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
	if (!deletedCustomer)
		return res.status(404).send(`Customer with ID ${req.params.id} not found`);
	res.send(deletedCustomer);
});

//---------------------------------------------------------------- Exports
module.exports = router;
