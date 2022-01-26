const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

mongoose
	.connect('mongodb://localhost/vidly')
	.then(() => console.log('Connected to mongoDB'))
	.catch((err) => console.log(`Error: ${err}`));

// Schema are the rules to which the data must oblige
const genereSchema = new mongoose.Schema({
	genere: { type: String, minlength: 3, unique: true },
});

// Pascal naming convention -> Class
// A model is a class that respects the rules defined in the schema
const Genere = mongoose.model('generes', genereSchema);

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

//---------------------------------------------------------------- GET
async function getGenere(id) {
	const output = await Genere.find();
	console.log(output);
	//return output;
}

router.get('/', (req, res) => {
	const completeArray = getGenere();
	res.send(completeArray);
});

router.get('/:id', (req, res) => {
	const genere = generes.find((c) => c.id === parseInt(req.params.id));
	if (!genere)
		res.status(404).send('The genere with the given ID was not found');
	res.send(genere);
});

//---------------------------------------------------------------- POST
async function createGenere(genere) {
	const genereToBeCreated = new Genere({
		genere: genere,
	});
	const result = await genereToBeCreated.save();
	console.log(result);
	return genereToBeCreated;
}

router.post('/', (req, res) => {
	const generated = createGenere(req.body.genere);
	res.send(generated);
});

//---------------------------------------------------------------- PUT
async function updateGenere(id, genere) {
	try {
		const genereToBeUpdated = await Genere.findByIdAndUpdate(
			id,
			{
				$set: { genere: genere },
			},
			{ new: true }
		);
		console.log(genereToBeUpdated);
		return genereToBeUpdated;
	} catch (e) {
		print(e);
	}
}

router.put('/:id', (req, res) => {
	res.send(updateGenere(String(req.params.id), String(req.body.genere)));
});

//---------------------------------------------------------------- DELETE
async function deleteGenere(id) {
	const genereToBeDeleted = await Genere.findOneAndDelete({ _id: id });
	console.log(genereToBeDeleted);
}

router.delete('/:id', (req, res) => {
	const deletedGenere = deleteGenere(String(req.params.id));
	res.status(201).send(deletedGenere);
});

module.exports = router;
