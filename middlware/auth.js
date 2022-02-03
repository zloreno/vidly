const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) return res.status(401).send('Access Denied. No token provided');

	try {
		console.log('decoding..');
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		// Not super sure why
		req.user = decoded;
		next();
	} catch (err) {
		console.log(err);
		res.status(400).send('Invalid Token');
	}
}

module.exports = auth;
