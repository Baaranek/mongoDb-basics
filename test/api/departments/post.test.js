const {expect, request} = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model')

chai.use(chaiHttp);

describe('POST /api/departments', async () => {

  it('/ should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/departments').send({ name: '#Department #1' });
    const newDepartment = await Department.findOne({ name: '#Department #1' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newDepartment).to.not.be.null;
  });

  after(async () => {
    await Department.deleteMany();
  });
});