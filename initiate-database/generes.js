const mongoose = require('mongoose');

mongoose
	.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to MongoDB...'))
	.catch((err) => console.log('Error: ', err));

// Schema are the rules to which the data must oblige
const genereSchema = new mongoose.Schema({
	genere: { type: String, minlength: 3, index: { unique: true } },
});

// Pascal naming convention -> Class
// A model is a class that respects the rules defined in the schema
const Customers = mongoose.model('generes', genereSchema);

// Asynchronous method, it returns a promise
async function createGenere(genere) {
	const genereInsert = new Customers({
		genere: genere,
	});
	const result = await genereInsert.save();
	console.log(result);
}

const generes = [
	{ id: 1, genere: 'horror' },
	{ id: 2, genere: 'thriller' },
	{ id: 3, genere: 'fantasy' },
	{ id: 4, genere: 'action' },
	{ id: 5, genere: 'romance' },
	{ id: 6, genere: 'comedy' },
	{ id: 7, genere: 'historical' },
	{ id: 8, genere: 'documentary' },
];

for (index in generes) console.log(createGenere(generes[index].genere));
