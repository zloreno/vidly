const { User } = require('../../../models/users');
const auth = require('../../../middlware/auth');
const mongoose = require('mongoose');
const { JsonWebTokenError } = require('jsonwebtoken');

describe('Auth middleware', () => {
	it('should populate req.user with the payload of a valid JWT', () => {
		const payload = {
			_id: mongoose.Types.ObjectId().toHexString,
			isAdmin: true,
		};
		const token = new User(payload).generateAuthToken();

		const req = {
			header: jest.fn().mockReturnValue(token),
		};

		const res = {};
		const next = jest.fn();

		auth(req, res, next);

		expect(req.user).toBeDefined();
	});
});
