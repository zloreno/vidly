const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');

// Validation of the data in input
function validateGenere(req) {
	const schema = Joi.object({
		genere: Joi.string().required().min(3),
	});
	return schema.validate(req.body);
}

// Validation of the data inputted in the database
// Schema are the rules to which the data must oblige
const genereSchema = new mongoose.Schema({
	genere: { type: String, minlength: 3, unique: true, required: true },
});

// A model is a class that respects the rules defined in the schema
const Genere = mongoose.model('generes', genereSchema);

//---------------------------------------------------------------- GET
router.get('/', async (req, res) => {
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
router.post('/', async (req, res) => {
	// Validate
	const { error } = validateGenere(req);
	if (error) {
		console.log(error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}
	const genere = new Genere({ genere: req.body.genere });
	try {
		const savedGenere = await genere.save();
		res.send(savedGenere);
	} catch (err) {
		res.status(400).send(err);
	}
});

//---------------------------------------------------------------- PUT
router.put('/:id', async (req, res) => {
	// Validate
	const { error } = validateGenere(req);
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
router.delete('/:id', async (req, res) => {
	const genere = await Genere.findOneAndDelete({ _id: req.params.id });
	if (!genere)
		return res
			.status(404)
			.send(`No generes with the provided ID ${req.params.id} was found`);
	res.status(201).send(genere);
});

//---------------------------------------------------------------- Exports
module.exports = router;
