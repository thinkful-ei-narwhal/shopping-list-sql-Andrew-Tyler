const app = require('../src/app');

describe('App', () => {
  it('should return 200 "Hello world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, {message: 'Hello world!' });
  });
});