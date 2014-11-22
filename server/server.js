var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var Pizza = require('../server/models/pizza').Pizza;
var app = express();

app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//!! - uncommnet when mongdo is configured ---   mongoose.connect('mongodb://localhost');

/*app.get('/', function (req, res) {
  res.send('Hello World!')
});*/

console.log('staticpath=%s', path.join(__dirname, '../client'));

app.post('/submitpizza', function(req, res) {
	console.log('submitpizza');
	console.log(req.body);
	
	//TODO: Handle the req.body that was submitted, store in DB
	
	res.redirect('results');
});

app.get('/results', function (req, res) {
	res.send('TODO: results page... Need to implement!')
});

var server = app.listen(process.env.PORT || 8080, process.env.IP || 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
