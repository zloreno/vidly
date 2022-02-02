// Title -> string
// Genere -> document {_id, name }
//      hybrid approach, as unlikely that we will rename generes
// NUmber in stock -> number
// Daily rental rate -> number

const mongoose = require('mongoose');
const { Movie, validate } = require('../models/movies');
const express = require('express');
const { Genere } = require('../models/generes');
const router = express.Router();

//---------------------------------------------------------------- GET
router.get('/', async (req, res) => {
	res.send(await Movie.find().sort('title'));
});

router.get('/:id', async (req, res) => {
	const movie = await Movie.findById(req.params.id);
	if (!movie)
		return res
			.status(404)
			.send(`No movies with the provided ID ${req.params.id} was found`);
	res.send(movie);
});

//---------------------------------------------------------------- POST
router.post('/', async (req, res) => {
	const { error } = validate(req);
	if (error) {
		console.log(error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}

	const genere = await Genere.findById(req.body.genereId);

	if (!genere)
		return res.status(400).send(`Invalid Genere ID ${req.body.genereId}`);

	console.log(`_id: ${genere._id} \nname: ${genere.genere}`);

	const movie = new Movie({
		title: req.body.title,
		genere: {
			_id: genere._id,
			genere: genere.genere,
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate,
	});

	try {
		await movie.save();
		res.send(movie);
	} catch (err) {
		res.status(400).send(err);
	}
});

//---------------------------------------------------------------- PUT
router.put('/:id', async (req, res) => {
	const oldMovie = await Movie.findById(req.params.id);
	console.log(oldMovie);
	let movie = await Movie.findOneAndUpdate(
		{ _id: req.params.id },
		{
			$set: {
				title: req.body.title || oldMovie.title,
				genere: {
					genere: req.body.genere.genere || oldMovie.genere.genere,
				},
				numberInStock: req.body.numberInStock || oldMovie.numberInStock,
				dailyRentalRate: req.body.dailyRentalRate || oldMovie.dailyRentalRate,
			},
		},
		{ new: true }
	);
	// Joi validator
	if (!movie)
		return res.status(404).send(`Movie with ID ${req.params.id} not found`);

	return res.send(movie);
});

//---------------------------------------------------------------- DELETE
router.delete('/:id', async (req, res) => {
	const movie = await Movie.findOneAndDelete({ _id: req.params.id });
	if (!movie)
		return res
			.status(404)
			.send(`No movies with the provided ID ${req.params.id} was found`);
	res.status(201).send(movie);
});

module.exports = router;
