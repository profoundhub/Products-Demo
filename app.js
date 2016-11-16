var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('catalog', ['products']);

app.get('/', function(req, res){
	res.send('Welcome to our Products Demo App!');
});

app.get('/products', function(req, res) {
	console.log('Fetching Products ...');
	db.products.find(function(err, docs) {
		if(err){
			res.send(err);
		} else {
			console.log('Sending Products ...');
			res.json(docs);
		}
	});
});

app.get('/products/:id', function(req, res) {
	console.log('Fetching Product...');
	db.products.findOne({ _id:mongojs.ObjectId(req.params.id)}, function(err, doc){
		if(err) {
			res.send(err);
		} else {
			console.log('Sending Product ...');
			res.json(doc);
		}
	});
});

app.listen(3000);
console.log('My server is now running on port 3000 ...');
