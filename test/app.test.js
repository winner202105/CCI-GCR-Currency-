const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
chai.use(chaiHttp);

describe("GET /api/convert", () => {
    it("converts USD 2 to JPY 208.98", done => {
        chai.request(app)
            .get("/api/convert?unit=USD&value=2")
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.amount).to.equals(208.98);
                done();                
            });
    });

    it("converts USD 10 to JPY 1044.9", done => {
        chai.request(app)
            .get('/api/convert?unit=USD&value=10')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.amount).to.equals(1044.90);
                done();                
            });
    });    
});
