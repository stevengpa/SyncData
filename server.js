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
				{Name: 'Steven', Age: 25},
				{Name: 'Jhon', Age: 15},
				{Name: 'Jane', Age: 50}
			 ];

app.get('/read', function (req, res) {
  res.send(people);
});

app.post('/read2', function (req, res) {
	console.log(req.body.name);
  res.send(people);
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});