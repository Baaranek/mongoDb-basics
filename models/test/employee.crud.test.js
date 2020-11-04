const Employee = require('../employee.model');
const mongoose = require('mongoose');
const {expect} = require('chai');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Employee', () => {

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
      const testDepOne = new Employee({ firstName: 'John', lastName: 'Johnson', department: 'IT'})
      testDepOne.save();
      const testDepTwo = new Employee({ firstName: 'Bob', lastName: 'Bobson', department: 'IT'})
      testDepTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();
      expect(employees.length).to.be.equal(2);
    });
    it('should return proper document by various params with "findOne" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John'});
      expect(employee.lastName).to.be.equal('Johnson');
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const employee = Employee({ firstName: 'John', lastName: 'Johnson', department: 'IT' });
      await employee.save();
      expect(employee.isNew).to.be.false;
    });
    
    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testDepOne = new Employee({ firstName: 'John', lastName: 'Johnson', department: 'IT'})
      testDepOne.save();
      const testDepTwo = new Employee({ firstName: 'Bob', lastName: 'Bobson', department: 'IT'})
      testDepTwo.save();
    });
    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne({firstName: 'John'}, {$set: {lastName: 'Jeckson'}});
      const employee = await Employee.findOne({ lastName: 'Jeckson' });
      expect(employee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.lastName = 'Jeckson';
      await employee.save();
      const updatedEmployee = await Employee.findOne({ lastName: 'Jeckson' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany({}, {$set: {lastName: 'Jeckson'}});
      const employees = await Employee.find({ lastName: 'Jeckson' });
      expect(employees[0].lastName).to.be.equal('Jeckson');
      expect(employees[1].lastName).to.be.equal('Jeckson');
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });

  describe('Removing data', () => {

    beforeEach(async () => {
      const testDepOne = new Employee({ firstName: 'John', lastName: 'Johnson', department: 'IT'})
      testDepOne.save();
      const testDepTwo = new Employee({ firstName: 'Bob', lastName: 'Bobson', department: 'IT'})
      testDepTwo.save();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const deletedData = await Employee.findOne({ firstName: 'John' });
      expect(deletedData).to.be.null;
    });

    it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      await employee.remove();
      const deletedData = await Employee.findOne({ firstName: 'John' });
      expect(deletedData).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();
      const deletedData = await Employee.find();
      expect(deletedData.length).to.be.equal(0);
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });
  });
});