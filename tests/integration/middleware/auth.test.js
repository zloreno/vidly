const request = require('supertest');
const { User } = require('../../../models/users');
const { Genere } = require('../../../models/generes');

describe('Auth middleware', () => {
	beforeEach(() => {
		server = require('../../../index');
		token = new User().generateAuthToken();
	});
	afterEach(async () => {
		server.close;
		await Genere.deleteMany({});
	});

	let token;

	const happyPath = async () => {
		return await request(server)
			.post('/api/generes')
			.set('x-auth-token', token)
			.send({ genere: 'genere_1' });
	};

	it('should return 401 if no token is provided', async () => {
		token = '';
		const response = await happyPath();
		expect(response.status).toBe(401);
	});

	it('should return 400 if token is invalid', async () => {
		token = null;
		const response = await happyPath();
		expect(response.status).toBe(400);
	});

	it('should return 200 if token is valid', async () => {
		const response = await happyPath();
		expect(response.status).toBe(200);
	});
});
