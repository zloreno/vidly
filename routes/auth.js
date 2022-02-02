const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/users');
const express = require('express');
const Joi = require('joi');
const router = express.Router();

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().min(2).max(255).required().email(),
		password: Joi.string().min(2).max(2048).required(),
	});
	return schema.validate(req.body);
}

//---------------------------------------------------------------- POST

router.post('/', async (req, res) => {
	const { error } = validate(req);
	if (error) {
		console.log(error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}

	// Make sure that user is not already registered
	const existingUser = await User.findOne({ email: req.body.email });
	if (!existingUser) return res.status(400).send(`Invalid email or password`);

	const validPassword = await bcrypt.compare(
		req.body.password,
		existingUser.password
	);
	if (!validPassword) return res.status(400).send(`Invalid email or password`);

	res.send(true);
});

module.exports = router;
