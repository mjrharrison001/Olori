//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

chai.use(chaiHttp);
//Our parent block
describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
           done();
        });
    });
/*
  * Test the /GET route
  */
  describe('/GET user', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.obj.should.be.a('array');
                res.body.obj.length.should.be.eql(0);
              done();
            });
      });
  });

  /*
  * Test the /POST route
  */
  describe('/POST user', () => {
      it('it should not POST a user without userName field', (done) => {
        let user = {
          email: "mike@gmail.com",
          password: "password"
        }
        chai.request(server)
            .post('/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                res.body.error.should.have.property('errors');
                res.body.error.errors.should.have.property('userName');
                res.body.error.errors.userName.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a user ', (done) => {
        let user = {
          userName: "Mike",
        	email: "mike@gmail.com",
        	password: "password"
        }
        chai.request(server)
            .post('/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.obj.should.be.a('object');
                res.body.should.have.property('message').eql('User created');
                res.body.obj.should.have.property('userName');
                res.body.obj.should.have.property('email');
                res.body.obj.should.have.property('lastActive');
                res.body.obj.should.have.property('totalUnrealizedGains');
                res.body.obj.should.have.property('totalRealizedGainsMonthly');
                res.body.obj.should.have.property('totalRealizedGainsWeekly');
                res.body.obj.should.have.property('totalRealizedGainsDaily');
                res.body.obj.should.have.property('keysBittrex');
                res.body.obj.should.have.property('keysPoloniex');
              done();
            });
      });
    });
});
