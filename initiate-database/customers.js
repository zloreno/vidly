const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.log('Error: ', err));

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

// Asynchronous method, it returns a promise
async function createCustomer(customer) {
	const customerInsert = new Customer({
		isGold: customer.isGold,
		name: customer.name,
		phone: customer.phone,
	});

	const result = await customerInsert.save();
	console.log(result);
}

const customer = [
	{ isGold: true, name: 'lele', phone: '12345' },
	{ isGold: true, name: 'mà', phone: '23456' },
	{ isGold: true, name: 'dani', phone: '34567' },
	{ isGold: true, name: 'pilo', phone: '45678' },
	{ isGold: true, name: 'lollo', phone: '56789' },
	{ isGold: true, name: 'jape', phone: '67890' },
	{ isGold: true, name: 'palu', phone: 'a7890' },
	{ isGold: true, name: 'luca', phone: 'ab890' },
	{ isGold: true, name: 'danif', phone: 'abc90' },
];

for (index in customer) console.log(createCustomer(customer[index]));
