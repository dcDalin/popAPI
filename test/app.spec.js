/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
// Configure chai
chai.use(chaiHttp);
chai.should();

describe('counties', () => {
  describe('All Counties /', () => {
    // Test to get all users record
    it('should get all counties', (done) => {
      chai
        .request(app)
        .get('/api/county')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should add a county', (done) => {
      const newCounty = {
        name: 'Nairobi',
      };
      chai
        .request(app)
        .post('/api/county')
        .send(newCounty)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          done();
        });
    });
    it('should object same county name', (done) => {
      const newCounty = {
        name: 'Nairobi',
      };
      chai
        .request(app)
        .post('/api/county')
        .send(newCounty)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          done();
        });
    });
  });
});
