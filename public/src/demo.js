var syncdata = require('./syncdata.js');

// >> Observable
syncdata.observe.setObservable(function(params){
	console.log(params);
});

// >> Routes
syncdata.setRoutes({READ: '/read', CREATE: '/create'});

// >> READ
syncdata.read(null, function(response){
	console.log('GET');
	console.log(response);
});

syncdata.setRoutes({READ: '/read2'});

syncdata.read({method: 'POST', async: false, data: {name: 'Steven'} }, function(response){
	console.log('POST');
	console.log(response);
});

// >> CREATE