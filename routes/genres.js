const mongoose = require('mongoose');
const express = require('express');
const { Genere, validate } = require('../models/generes');
const auth = require('../middlware/auth');
const admin = require('../middlware/admin');
const router = express.Router();

//---------------------------------------------------------------- GET
router.get('/', async (req, res, next) => {
	throw new Error('Could not find the generes');
	res.send(await Genere.find().sort('genere'));
});

router.get('/:id', async (req, res) => {
	const genere = await Genere.findById(req.params.id);
	if (!genere)
		return res
			.status(404)
			.send(`No generes with the provided ID ${req.params.id} was found`);
	res.send(genere);
});

//---------------------------------------------------------------- POST
router.post('/', auth, async (req, res) => {
	// Validate
	const { error } = validate(req);
	if (error) {
		console.log(error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}
	const genere = new Genere({ genere: req.body.genere });
	try {
		await genere.save();
		res.send(genere);
	} catch (err) {
		res.status(400).send(err);
	}
});

//---------------------------------------------------------------- PUT
router.put('/:id', async (req, res) => {
	// Validate
	const { error } = validate(req);
	if (error) {
		console.log(error.details[0].message);
		return res.status(400).send(error.details[0].message); //.details[0].message.message
	}
	// Update
	const genere = await Genere.findByIdAndUpdate(
		req.params.id,
		{ $set: { genere: req.body.genere } },
		{ new: true }
	);
	// If invalid
	if (!genere)
		return res
			.status(404)
			.send(`No generes with the provided ID ${req.params.id} was found`);
	res.send(genere);
});

//---------------------------------------------------------------- DELETE
router.delete('/:id', [auth, admin], async (req, res) => {
	const genere = await Genere.findOneAndDelete({ _id: req.params.id });
	if (!genere)
		return res
			.status(404)
			.send(`No generes with the provided ID ${req.params.id} was found`);
	res.status(201).send(genere);
});

//---------------------------------------------------------------- Exports
module.exports = router;
