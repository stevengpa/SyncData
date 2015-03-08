var sync = require('./syncdata.js'),
	syncdata = sync();

// >> Observable
syncdata.observe.setObservable(function(params){
	// Observable Result
	//>> Params
	console.log('Observable Result');
	console.log(params);
	// >> End Params
});

// >> CREATE
/*
var item = { Name: 'Mochi', Age: 27, cuid: 'ci6yfbkxl0000334z7f1w8gr7' };

// >> POST
syncdata.setRoutes({READ: '/read'});
syncdata.read();

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
	console.log(syncdata.data());
});
*/

// >> READ 
/*
// >> GET
syncdata.setRoutes({READ: '/read'});

syncdata.read(null, function(response){
	console.log('GET');
	console.log(response);
});

// >> POST
syncdata.setRoutes({READ: '/read2'});

syncdata.read({method: 'POST', async: false, data: {name: 'Steven'} }, function(response){
	console.log('POST READ');
	console.log(response);
});
*/

// >> UPDATE
/*
syncdata.setRoutes({READ: '/read'});
syncdata.read({ async: false });

var item1 = syncdata.data()[0];
var item2 = syncdata.data()[1];
item1.Name = 'Panfilo';
item2.Name 	= 'Marito';
item2.Age 	= 100;

syncdata.setRoutes({UPDATE: '/update'});
syncdata.update({ item: item1 }, function(response) {
	console.log('POST UPDATE');
	console.log(response);
});

syncdata.setRoutes({UPDATE: '/update2'});
syncdata.update({ item: item2, method: 'GET' }, function(response) {
	console.log('GET UPDATE');
	console.log(response);
});
*/

// >> DELETE
/*
syncdata.setRoutes({READ: '/read'});
syncdata.read({ async: false });
console.log(syncdata.data());

var item1 = syncdata.data()[1];
var item2 = syncdata.data()[0];

syncdata.setRoutes({DELETE: '/delete'});
syncdata.delete({ cuid: item1.cuid, key: 'ID' }, function(response) {
	console.log('POST DELETE');
	console.log(response);
});

syncdata.setRoutes({DELETE: '/delete2'});
syncdata.delete({ cuid: item2.cuid, method:'GET' }, function(response) {
	console.log('GET DELETE');
	console.log(response);
});
*/

