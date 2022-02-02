const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User, validate } = require('../models/users');
const express = require('express');
const { required } = require('joi');
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

	const user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	return res.send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
