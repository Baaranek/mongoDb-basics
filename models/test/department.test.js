const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({});

    dep.validate( err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {

    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Department({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "name" has wrong legnth', () => {
    
    const cases = ['K', '123456789123456789123456789'];
    for(let name of cases) {
      const dep = new Department({name});

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error if name is okay', () => {
    
    const cases = ['IT', 'Department', 'Menagment'];
    for(let name of cases) {
      const dep = new Department({name});

      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});