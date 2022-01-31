const mongoose = require('mongoose');
const Joi = require('joi');
const { string } = require('joi');

function validateRental(req) {
	const schema = Joi.object({
		customerId: Joi.string().required(),
		movieId: Joi.string().required(),
	});
	return schema.validate(req.body);
}

// Validation of the data in input
const rentalSchema = new mongoose.Schema({
	customer: {
		type: new mongoose.Schema({
			name: {
				type: String,
				minlength: 2,
				maxlength: 255,
				required: true,
				trim: true,
			},
			isGold: {
				type: Boolean,
				default: false,
				required: true,
			},
			phone: {
				type: String,
				minlength: 3,
				maxlength: 15,
				required: true,
			},
		}),
	},
	movie: {
		type: new mongoose.Schema({
			title: {
				type: String,
				minlength: 2,
				maxlength: 255,
				required: true,
				trim: true,
			},
			dailyRentalRate: {
				type: Number,
				min: 0,
				max: 255,
				required: true,
			},
		}),
	},
	startDate: {
		type: Date,
		required: false,
		default: () => Date.now(),
	},
	endDate: {
		type: Date,
		required: false,
	},

	rentalFee: { type: Number, min: 0 },
});

const Rental = mongoose.model('rental', rentalSchema);

module.exports.Rental = Rental;
module.exports.validate = validateRental;
