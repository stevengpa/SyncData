var syncdata = require('./syncdata.js');

// >> Observable
syncdata.observe.setObservable(function(params){
	// Observable Result
	//>> Params
	console.log('Observable Result');
	console.log(params);
	// >> End Params
});

/* >> READ GET
syncdata.setRoutes({READ: '/read'});

syncdata.read(null, function(response){
	console.log('GET');
	console.log(response);
});
*/

/* READ POST
syncdata.setRoutes({READ: '/read2'});

syncdata.read({method: 'POST', async: false, data: {name: 'Steven'} }, function(response){
	console.log('POST READ');
	console.log(response);
});
*/

// >> CREATE
/*
var item = { Name: 'Mochi', Age: 27, cuid: 'ci6yfbkxl0000334z7f1w8gr7' };

// >> POST

syncdata.setRoutes({CREATE: '/create'});
syncdata.create({ item: item }, function(response) {
	console.log('POST CREATE');
	console.log(response);
});

// >> GET

syncdata.setRoutes({CREATE: '/create2'});
syncdata.create({ item: item, method:'GET', async: false, data: item }, function(response) {
	console.log('GET CREATE');
	console.log(response);
});
*/

// >> DELETE
syncdata.setRoutes({READ: '/read'});
syncdata.read({ async: false });
var item1 = syncdata.data()[0];
var item2 = syncdata.data()[0];

syncdata.setRoutes({DELETE: '/delete'});
syncdata.delete({ cuid: item1.cuid, key: 'ID' }, function(response) {
	console.log('POST DELETE');
	console.log(response);
});

syncdata.delete({ cuid: item2.cuid }, function(response) {
	console.log('POST DELETE');
	console.log(response);
});