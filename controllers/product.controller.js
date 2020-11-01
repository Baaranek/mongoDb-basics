const Product = require('../models/produduct.model');

exports.getAll = async (req, res) => {
  
  try {
    res.json( await Product.find());
  } catch (error) {
    res.status(500).json({ message:err });
  }
};

exports.getRandom = async (req, res) => {
  
  try {
    const count = await Product.countDocuments();
    const random = Math.floor(Math.random() * count);
    const dep = await Product.findOne().skip(random);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch ( err ) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {

  try {
    const dep = await Product.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
    
  }
};

exports.addNew = async (req, res) => {
  const { name, client } = req.body;
  try {
    const newProdcut = new Product({ name: name, client:client });
    await newProdcut.save();
    res.json({message: 'OK'});
  } catch (err){
    res.status(500).json({ message: err }); 
  }
};

exports.updateOne = async (req, res) => {
  const { name, client } = req.body;

  try {
    const dep = await(Product.findById(req.params.id));
    if(dep) {
      await Product.updateOne({ _id: req.params.id }, { $set: {name: name, client:client }});
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
    await Product.deleteOne({ _id : req.params.id });
      res.json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
