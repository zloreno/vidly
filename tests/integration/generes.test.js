const mongoose = require('mongoose');
const request = require('supertest');
const { Genere } = require('../../models/generes');
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

		it('Return status 400 when wrong _id', async () => {
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
});
