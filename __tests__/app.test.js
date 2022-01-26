const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Stranger = require('../lib/models/Stranger');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a stranger', async () => {
    const res = await request(app)
      .post('/api/v1/strangers')
      .send({ description: 'Marvin', annoyance: 'light' });

    expect(res.body).toEqual({
      projectId: expect.any(String),
      description: 'Marvin',
      annoyance: 'light',
    });
  });

  it('should be able to find a stranger by id', async () => {
    const stranger = await Stranger.insert({
      description: 'Henry',
      annoyance: 'very, very, very',
    });
    const response = await request(app).get(
      `/api/v1/strangers/${stranger.projectId}`
    );
    expect(response.body).toEqual(stranger);
  });

  it('should be able to find all stranger', async () => {
    const stranger = await Stranger.insert({
      description: 'Henry',
      annoyance: 'very, very, very',
    });
    const response = await request(app).get('/api/v1/strangers/');
    expect(response.body[0]).toEqual(stranger);
  });

  it('should be able to change a stranger', async () => {
    const stranger = await Stranger.insert({
      description: 'Henry',
      annoyance: 'very, very, very',
    });
    const response = await request(app)
      .patch(`/api/v1/strangers/${stranger.projectId}`)
      .send({ description: 'Harvey', annoyance: 'super horrible' });

    const expected = {
      projectId: expect.any(String),
      description: 'Harvey',
      annoyance: 'super horrible',
    };

    expect(response.body).toEqual(expected);
    expect(await Stranger.getById(stranger.projectId)).toEqual(expected);
  });

  it('should be able to delete a stranger', async () => {
    const stranger = await Stranger.insert({
      description: 'Henry',
      annoyance: 'very, very, very',
    });
    const response = await request(app).delete(
      `/api/v1/strangers/${stranger.projectId}`
    );
    expect(response.body).toEqual(stranger);
    expect(await Stranger.getById(stranger.projectId)).toBeNull();
  });
});
