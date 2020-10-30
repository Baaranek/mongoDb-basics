const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

router.get('/departments', (req, res) => {
  req.db.collection('departments').find().toArray((err, data) => {
    err ? res.status(500).json({ message: err })
    : res.json(data);
  });
});

router.get('/departments/random', (req, res) => {
  req.db.collection('departments').aggregate([ {$sample : {size:1}} ]).toArray((err, data) => {
    if(err) res.status(500).json({ message: err });
    else res.json(data[0]);
  });
});

router.get('/departments/:id', (req, res) => {
  req.db.collection('departments').findOne({ _id: ObjectId(req.params.id)}, (err, data) => {
    if(err) res.status(500).json({ message: err });
    else if(!data) res.status(404).json({ message: 'Not Found'});
    else res.json(data);
  });
});

router.post('/departments', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').insertOne({ name: name }, (err, data) => {
    if(err) res.status(500).json({message:err});
    else res.json({message: 'OK'})
  });
});

router.put('/departments/:id', (req, res) => {
  const { name } = req.body;
  req.db.collection('departments').update({ _id :ObjectId(req.params.id)}, { $set: { name : name } }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

router.delete('/departments/:id', (req, res) => {
  db.collection('departments').deleteOne({ _id : ObjectId(req.params.id) }, err => {
    if(err) res.status(500).json({ message: err });
    else res.json({ message: 'OK' });
  });
});

module.exports = router;
