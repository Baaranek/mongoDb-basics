const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/employees', (req, res) => {
  db.collection('employees').find().toArray((err, data) => {
    err ? res.status(500).json({ message: err })
    : res.json(data);
  });
});

router.get('/employees/random', (req, res) => {
  db.collection('employees').aggregate([ { $sample : { size: 1 } } ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

router.get('/employees/:id', (req, res) => {
  db.collection('employees').findOne({ _id: ObjectId(req.params.id) }, (err, data) =>{
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not Found'});
    else res.json(data);
  });
});

router.post('/employees', (req, res) => {
  const { firstName, lastName } = req.body;
  db.collection('employees').insertOne({ firstName: firstName, lastName: lastName }, (err, data) => {
    if(err) res.status(500).json({message:err});
    else res.json({message: 'OK'})
  });
});

router.put('/employees/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  db.collection('employees').updateOne({ _id : ObjectId(req.params.id)}, { $set: { firstName: firstName, lastName: lastName}}, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

router.delete('/employees/:id', (req, res) => {
  db.collection('employees').deleteOne({ _id: ObjectId(req.params.id)}, err =>{
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  })
});

module.exports = router;
