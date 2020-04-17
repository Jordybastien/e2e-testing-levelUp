process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);

describe('UI Testing', () => {
  let app, server;

  before('staring server', function () {
    app = require('../app');
    server = chai.request(app).keepOpen();
  });

  it('should GET all movies and return them to the UI template', (done) => {
    server.get('/').end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  it('should GET movies by genre and return them to the UI template', (done) => {
    const genre = 'Action';
    server.get(`/genre/${genre}`).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  it('should GET movies details and return them to the UI template', (done) => {
    const movieId = 1233;
    server.get(`/movie/${movieId}`).end((err, res) => {
      expect(res).to.have.status(200);
      expect(res.body).to.be.a('object');
      done();
    });
  });

  after('closing server', function () {
    server.close();
  });
});
