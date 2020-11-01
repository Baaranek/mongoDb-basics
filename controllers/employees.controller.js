const Employee = require('../models/employee.model');

exports.getAll =  async (req, res) => {
  try {
    res.json( await Employee.find().populate());
  } catch (err){
    res.status(500).json({ message:err })
  }
};

exports.getRandom = async (req, res) => {

  try {
    const count = await Employee.countDocuments();
    const random = Math.floor(Math.random() * count);
    const dep = await Employee.findOne().skip(random);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch ( err ) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  
  try {
    const dep = await Employee.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.addNew = async (req, res) => {
  const { firstName, lastName } = req.body;
  
  try {
    const newEmployee = new Employee({ firstName: firstName, lastName:lastName });
    await newEmployee.save();
    res.json({message: 'OK'});
  } catch (err){
    res.status(500).json({ message: err }); 
  }
};

exports.updateOne = async (req, res) => {
  const { firstName, lastName } = req.body;
  
  try {
    const dep = await(Employee.findById(req.params.id));
    if(dep) {
      await Employee.updateOne({ _id: req.params.id }, { $set: {firstName: firstName, lastName:lastName }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
 
  try {
    await Employee.deleteOne({ _id : req.params.id });
      res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};