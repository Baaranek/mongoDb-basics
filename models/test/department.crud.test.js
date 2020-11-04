const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Department', () => {

  before( async () => {
    try {
      const fakeDB = new MongoMemoryServer();
      const uri = await fakeDB.getUri();

      mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.log(err);
    }
  });

  describe('Reading data', () => {

    before(async () => {
      const testDepOne = new Department({ name: 'Department 1' })
      testDepOne.save();
      const testDepTwo = new Department({ name: 'Department 2' })
      testDepTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const department = await Department.find();
      const expectedLength = 2;
      expect(department.length).to.be.equal(expectedLength)
    });

    it('should return a proper document by "name" with "findOne" method', async () => {
      const expectedName = 'Department 1';
      const department = await Department.findOne({ name: expectedName });
      expect(department.name).to.be.equal(expectedName);
    });
  
    after(async () => {
      await Department.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const department = new Department({ name: 'Department 1' });
      await department.save();
      expect(department.isNew).to.be.false;
    });

    after(async () => {
      await Department.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department 1' })
      testDepOne.save();
      const testDepTwo = new Department({ name: 'Department 2' })
      testDepTwo.save();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Department.updateOne({ name: 'Department 1'}, {$set: { name: 'Department 1 Updated' }});
      const updatedData = await Department.findOne({ name: 'Department 1 Updated' });
      expect(updatedData).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async () => {
      const department = await Department.findOne({ name: 'Department 1' });
      department.name = 'Department 1 Updated';
      await department.save();

      const updatedData = await Department.findOne({ name: 'Department 1 Updated' });
      expect(updatedData).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async () => {
      await Department.updateMany({}, { $set: { name: 'Updated Data!' }});
      const departments = await Department.find();
      expect(departments[0].name).to.be.equal('Updated Data!');
      expect(departments[1].name).to.be.equal('Updated Data!');
    });
  
    afterEach(async () => {
      await Department.deleteMany();
    });
  });

  describe('Removing data', () => {

    
    beforeEach(async () => {
      const testDepOne = new Department({ name: 'Department 1' })
      testDepOne.save();
      const testDepTwo = new Department({ name: 'Department 2' })
      testDepTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Department.deleteOne({ name: 'Department 1'});
      const deletedData = await Department.findOne({ name: 'Department 1' });
      expect(deletedData).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async () => {
      const department = await Department.findOne({ name: 'Department 1' });
      await department.remove();
      const deletedData = await Department.findOne({ name: 'Department 1' });
      expect(deletedData).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Department.deleteMany();
      const deletedData = await Department.find();
      expect(deletedData.length).to.be.equal(0);
    });
    
    afterEach(async () => {
      await Department.deleteMany();
    });
  });
});