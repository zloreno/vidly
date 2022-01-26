const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
	res.send(JSON.stringify(generes));
});

router.get('/:id', (req, res) => {
	const genere = generes.find((c) => c.id === parseInt(req.params.id));
	if (!genere)
		res.status(404).send('The genere with the given ID was not found');
	res.send(genere);
});

router.post('/', (req, res) => {
	const genere = {
		id: generes.length + 1,
		name: req.body.name,
	};

	generes.push(genere);
	res.send(genere);
});

router.put('/:id', (req, res) => {
	const genere = generes.find((c) => c.id === parseInt(req.params.id));
	if (!genere)
		res.status(404).send('The genere with the given ID was not found');
	genere.genere = req.body.genere;
	res.send(genere);
});

router.delete('/:id', (req, res) => {
	const genere = generes.find((c) => c.id === parseInt(req.params.id));
	if (!genere)
		res.status(404).send('The genere with the given ID was not found');
	generes.splice(generes.indexOf(genere), 1);
	res.status(201).send(genere);
});

module.exports = router;
