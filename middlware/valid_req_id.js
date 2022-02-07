const mongoose = require('mongoose');

function validateId(req, res, next) {
	if (!mongoose.Types.ObjectId.isValid(req.params.id))
		return res.status(400).send('Invalid Object Id');
	next();
}

module.exports = validateId;
