var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var cons = require('consolidate');
var dust = require('dustjs-linkedin');

var Pizza = require('../server/models/pizza').Pizza;
var PizzaCombonitorics = require('../server/models/pizza_combinatorics').Pizza_Combinatorics;
var app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('dust', cons.dust);
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//!! - uncommnet when mongdo is configured ---   mongoose.connect('mongodb://localhost');

//I have mongo configured on my local machine
mongoose.connect('mongodb://localhost/test');
/*app.get('/', function (req, res) {
  res.send('Hello World!')
});*/

console.log('staticpath=%s', path.join(__dirname, '../client'));
console.log('/bower_components=%s', path.join(__dirname, '../bower_components/'))
app.get('/', function(req, res) {
console.log('app.get.root');
	res.render('login');
});

app.post('/submitname', function(req, res) {
	if (req.body.name) {
		res.render('pick-pizza', {name: req.body.name});
		//res.redirect('/pick-pizza');
	} else {
		//!!res.redirect('/?error=name');
		res.render('login', { errorMessage: 'Name is a required field.'});
	}
});

app.get('/pick-pizza', function(req, res) {
	if (req.query.name) {
console.log('pick-pizza : name=%s', req.query.name);		
		res.render('pick-pizza', { name: req.query.name});
	} else {
		res.redirect('/?error=name');
	}
});

app.post('/submitpizza', function(req, res) {
	try
	{
		console.log('submitting pizza');
		console.log(req.body);
		
		//TODO: Handle the req.body that was submitted, store in DB
		
		var pizza = new Pizza(req.body);

		pizza.save(function (err) {
			console.log('Pizza callback save.\n');
			if (err) {
				console.log(err);	
			} else {
				console.log(req.body.toString() + ' saved successfully\n');
			}			
		});

		res.redirect('results');
	} catch(exception){
		console.log(exception);
	}
	
});

app.get('/results', function (req, res) {
	Pizza.find({}, function(err, pizzas){
		//var combos = new PizzaCombonitorics();
		pizzasToOrder = PizzaCombonitorics.GetPizzas(pizzas);
		console.log(pizzasToOrder);
		res.render('results',{pizzas : pizzasToOrder});
	});
});

var server = app.listen(process.env.PORT || 8080, process.env.IP || 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
