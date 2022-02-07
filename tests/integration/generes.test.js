const { response } = require('express');
const mongoose = require('mongoose');
const request = require('supertest');
const { Genere } = require('../../models/generes');
const { User } = require('../../models/users');

let server;

describe('/api/generes', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		server.close;
		await Genere.deleteMany({});
	});

	describe('GET /', () => {
		it('Should return all generes', async () => {
			await Genere.collection.insertMany([
				{ genere: 'genere_1' },
				{ genere: 'genere_2' },
			]);
			const res = await request(server).get('/api/generes');
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(res.body.some((g) => g.genere == 'genere_1')).toBeTruthy();
			expect(res.body.some((g) => g.genere == 'genere_2')).toBeTruthy();
		});
	});

	describe('GET /:id', () => {
		it('Return genere when _id is valid', async () => {
			const payload = {
				_id: new mongoose.Types.ObjectId().toHexString(),
				genere: 'genere_1',
			};

			const genere = new Genere(payload);

			await genere.save();

			const res = await request(server).get(`/api/generes/${payload._id}`);

			console.log(res.body);

			expect(res.status).toBe(200);
			expect([res.body].length).toBe(1);
			expect(res.body).toEqual(
				expect.objectContaining({ _id: payload._id, genere: payload.genere })
			);
		});

		it('Return status 404 when wrong _id', async () => {
			const payload_loaded = {
				_id: new mongoose.Types.ObjectId().toHexString(),
				genere: 'genere_1',
			};

			const payload_not_loaded = {
				_id: new mongoose.Types.ObjectId().toHexString(),
				genere: 'genere_2',
			};

			const genere = new Genere(payload_loaded);

			await genere.save();

			const res = await request(server).get(
				`/api/generes/${payload_not_loaded._id}`
			);

			console.log(res.body);

			expect(res.status).toBe(404);
			expect(res.body).toEqual(
				expect.not.objectContaining({
					_id: payload_not_loaded._id,
					genere: payload_not_loaded.genere,
				})
			);
		});
	});

	describe('POST /', () => {
		// Define Happy Path, and then in each test we change
		// one parameter that clearly aligns with the name
		// of the test

		beforeEach(() => {
			token = new User().generateAuthToken();
			genere = 'genere_1';
		});

		let token;
		let genere;

		const execute = async () => {
			return await request(server)
				.post('/api/generes')
				.set('x-auth-token', token)
				.send({ genere });
		};

		it('should return 401 if client is not logged in', async () => {
			token = '';
			const response = await execute();
			expect(response.status).toBe(401);
		});

		it('should return 400 if genere less than 3 characters', async () => {
			genere = '12';
			const response = await execute();
			expect(response.status).toBe(400);
		});

		it('should return 400 if genere over 50 character', async () => {
			genere = new Array(52).join('a');
			const response = await execute();
			expect(response.status).toBe(400);
		});

		it('should save genere if valid', async () => {
			const response = await execute();
			const returned = await Genere.findOne({ genere: 'genere_1' });
			expect(returned).not.toBeNull();
			expect(response.status).toBe(200);
		});

		it('should return genere if it is valid', async () => {
			const response = await execute();
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty('_id');
			expect(response.body).toEqual(
				expect.objectContaining({ genere: genere })
			);
		});
	});
});
