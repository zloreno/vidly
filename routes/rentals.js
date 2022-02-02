// api/rentals
// GET

// POST
// check if numberInStock > 0
// if success, then numberInStock--

const mongoose = require('mongoose');
const { Movie } = require('../models/movies');
const { Customer } = require('../models/customers');
const { Rental, validate } = require('../models/rentals');
const express = require('express');
const router = express.Router();

//---------------------------------------------------------------- GET
router.get('/', async (req, res) => {
	res.send(await Rental.find().sort('startDate'));
});

router.get('/:id', async (req, res) => {
	const rental = await Rental.findById(req.params.id);
	if (!rental)
		return res
			.status(404)
			.send(`No rentals with the provided ID ${req.params.id} was found`);
	res.send(rental);
});

//---------------------------------------------------------------- POST
router.post('/', async (req, res) => {
	const { error } = validate(req);
	if (error) {
		console.log(error.details[0].message);
		return res.status(400).send(error.details[0].message);
	}

	if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
		return res.status(400).send(`Customer ID ${req.body.movieId} not valid`);

	if (!mongoose.Types.ObjectId.isValid(req.body.movieId))
		return res.status(400).send(`Movie ID ${req.body.movieId} not valid`);

	/* 	const genere = await Genere.findById(req.body.genereId);
	if (!genere)
		return res.status(400).send(`Invalid Genere ID ${req.body.genereId}`); */

	const movie = await Movie.findById(req.body.movieId);
	if (!movie)
		return res.status(404).send(`Movie ID ${req.body.movieId} not found`);

	if (movie.numberInStock <= 0)
		return res
			.status(400)
			.send(`Movie ID ${req.body.movieId} is not available at the moment`);

	const customer = await Customer.findById(req.body.customerId);

	if (!customer)
		return res.status(400).send(`Customer ID ${req.body.customerId} not found`);

	const rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			isGold: customer.isGold,
			phone: customer.phone,
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate,
		},
	});

	console.log(rental);

	/* 	try {
		new Fawn.Task()
			.save('rentals', rental)
			.findByIdAndUpdate(
				'movies',
				{ _id: req.body.movieId },
				{
					$inc: { numberInStock: -1 },
				}
				// If you don't write run() nothing wil run
			)
			.run();
	} catch (err) {
		res.status(400).send(`Something failed\n ${err}`);
	} */
});

module.exports = router;
