let chai = require('chai');
var assert = chai.assert;
let chaiHttp = require('chai-http');
let app = require('../routes/api/v1/credit/index');
const faker = require("faker");
var expect = chai.expect;
let should = chai.should();


chai.use(chaiHttp);

describe("Get Drivers Details", function() {
    describe("Drivers details", function() {
        it("get the driver listing", function(done) {
            // Send some Form Data
             chai.request(app)
            .get('/api/v1/card')
            .send()
            .end(function (err, res) {
				try {
					 expect(res.status).to.equal(200);          
				 } catch (e) {
					throw new Error('Not feched,  failed');
					throw new Error(res.status);
				 }	         
                done();
            });
        });
    });
});
describe("Registration Testing", function() {
    describe("Regitration details", function() {
        it("get the registration status", function(done) {
            // Send some Form Data
             chai.request(app)
            .post('/api/v1/card/add')
            .send({
            name:faker.name.findName()
            card_no: faker.Bank.account_number(), 
            card_limit: faker.number(digits: 7)
			
            })
            .end(function (err, res) {
				try {
					 expect(res.status).to.equal(200);          
				 } catch (e) {
					throw new Error('User registration failed');
					throw new Error(res.status);
				 }				
                expect(res.status).to.equal(200);               
                done();
            });
        });
    });
});





