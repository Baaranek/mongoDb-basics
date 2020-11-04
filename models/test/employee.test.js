const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

  const mockProps = {
    firstName: 'John',
    lastName: 'Johnson',
    department: 'IT',
  }

  it('should throw an error if no args', () => {

    const dep = new Employee({});
    dep.validate(err => {
      expect(err.errors).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw an error if args are not strings', () => {

    const dep = new Employee({ firstName: [], lastName: {}, department: [] });

    dep.validate(err => {
      expect(err).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should not throw errors if args are correct', () => {

    const dep = new Employee({ 
      firstName: mockProps.firstName,
      lastName: mockProps.lastName,
      department: mockProps.department});
    dep.validate(err => {
      expect(err).to.not.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });

  it('should throw error if there is no firstName or lastName', () => {

    const dep = new Employee({ department: mockProps.department });
    dep.validate(err => {
      expect(err.errors).to.exist;
    });
    after(() => {
      mongoose.models = {};
    });
  });
});
