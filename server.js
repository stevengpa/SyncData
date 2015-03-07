var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();

// Views
app.use(express(__dirname + 'views')); 
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);

// Public
app.use(express.static(__dirname + '/public'));

// Body
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', function (req, res) {
  res.render('index.html');
});

var people = [
				{ID: 1, Name: 'Steven', Age: 25},
				{ID: 2, Name: 'Jhon', Age: 15},
				{ID: 3, Name: 'Jane', Age: 50}
			 ];

app.get('/read', function (req, res) {
  res.send(people);
});

app.post('/read2', function (req, res) {
	console.log(req.body.name);
  res.send(people);
});

app.post('/create', function (req, res) {
	console.log(req.body);
	var item = {
		Name: req.body.Name,
		Age: req.body.Age,
		ID: people.length + 1
	};
	
	people.push(item);
  	res.send(item);
});

app.get('/create2', function (req, res) {
	console.log(req.query);
	var item = {
		Name: req.query.Name,
		Age: req.query.Age,
		ID: people.length + 1
	};
	
	people.push(item);
  	res.send(item);
});

function deleteItem(id) {
	var itemIndex = people.map(function(data) { return id; }).indexOf(id);

	if (itemIndex >= 0)
		people.splice(itemIndex, 1);
	else
		throw 'Item was not found through cuid ' + params.cuid;
}

app.post('/delete', function (req, res) {
	console.log(req.body);
	deleteItem({ id: req.body.ID });
  	res.send(people);
});

app.get('/delete2', function (req, res) {
	console.log(req.query);
	deleteItem({ id: req.query.ID });
  	res.send(people);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});