var ObjectID = require('mongodb').ObjectID;
//just using local var for simplicity
var cart = [];
var Pen = require('../../models/pens');
var PurchaseOrder = require('../../models/purchaseOrders');
var LineItem = require('../../models/lineItems');
module.exports = function (app, db) {
  //Pen types - only gets, administering product offerings outside scope
  //of this service
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
  //Pens
  app.get('/pens/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('pens').findOne(details, (err, item) => {
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
  app.post('/pens/addToCart', (req, res) => {
    var pen = new Pen(req.body);
	//check if pentype is valid
	const details = { '_id': new ObjectID(pen.typeId) };
	db.collection('penTypes').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
		if (item === null) {
			res.send({'error':'The Pen Type does not exist'});
		}
		else {
			console.log(item);
			cart.push(pen);
			res.json(cart);
		}
      } 
    });
  });
  
  //Cart - this is a very rough first pass - would likely opt to use
  //existing cart or commerce solution
  app.get('/cart', (req, res) => {
    res.json(cart);
  });
  app.post('/cart/submit', (req, res) => {
	if(cart.length > 0) {
		//validate user info/payment/etc
		//could utilize address validation etc, for now just ensure not null
		var purchaseOrder = new PurchaseOrder(req.body);
		if (purchaseOrder.customerId !== null && purchaseOrder.shippingAddress !== null) {
			db.collection('purchaseOrders').insert(purchaseOrder, (err, result) => {
			  if (err) { 
				res.send({ 'error': 'An error has occurred' }); 
			  } else {
				var orderId = result.ops[0]._id;
				cart.forEach(function(element) {
					db.collection('pens').insert(element, (err, result) => {
					  if (err) { 
						res.send({ 'error': 'An error has occurred' }); 
					  } else {
						var penId = result.ops[0]._id;
						var lineItem = new LineItem({'itemId':penId, 'purchaseOrderId':orderId});
						db.collection('lineItems').insert(lineItem, (err, result) => {
						  if (err) { 
							res.send({ 'error': 'An error has occurred' }); 
						  } else {
							res.send(result.ops[0]);
						  }
						});
					  }
					});
				});	
			  }
			});
		}
    }
	else {
	  res.send({ 'error': 'your cart is empty' });
	}
    console.log(req.body);
  });
  
  //orders
  app.get('/orders/:custId', (req, res) => {
    const custId = req.params.custId;
    const details = { 'customerId': custId };
    db.collection('purchaseOrders').find(details).toArray(function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.json(result);
      } 
    });
  });
  //This should include user validation as well using custId.
  app.get('/orders/:custid/:orderId', (req, res) => {
    const orderId = req.params.orderId;
    const details = { 'purchaseOrderId': orderId };
	console.log(orderId);
	console.log(details);
	db.collection('lineItems').find(details).toArray(function(err, result) {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
		console.log(result);
		res.json(result);
      } 
    });
	
  });
};