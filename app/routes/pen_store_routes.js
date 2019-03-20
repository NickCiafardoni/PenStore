var ObjectID = require('mongodb').ObjectID;
var Pen = require('../../models/pens');
module.exports = function (app, db) {
  app.get('/penTypes', (req, res) => {
    db.collection('penTypes').find({}).toArray(function(err, result) {
	  if (err) {
	    res.set({'error':'An error has occured listing all pen types'});
	  } else {
	    res.json(result);
	  }
	});
  });
  app.get('/penTypes/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('penTypes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.json(item);
      } 
    });
  });
  app.post('/pens/create', (req, res) => {
    var pen = new Pen(req.body);
    db.collection('pens').insert(pen, (err, result) => {
	  if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
	});
    console.log(req.body);
  });
};