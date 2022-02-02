const mongoose = require('mongoose');
const { User, validate } = require('../models/users');
const express = require('express');
const router = express.Router();

//---------------------------------------------------------------- GET
router.get('/', async (req, res) => {
	res.send(await User.find().sort('name'));
});

router.get('/:id', async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user)
		return res
			.status(404)
			.send(`No users with the provided ID ${req.params.id} was found`);
	res.send(user);
});

//---------------------------------------------------------------- POST

router.post('/', async (req, res) => {
	const { error } = validate(req);
	if (error) {
		console.log(error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}

	// Make sure that user is not already registered
	const existingUser = await User.findOne({ email: req.body.email });
	if (existingUser)
		return res
			.status(400)
			.send(`User with email ${req.body.email} already exists!`);

	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	});

	await user.save();
	return res.send(user);
});

module.exports = router;
