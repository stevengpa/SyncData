// Browserify
var syncdata = require('./syncdata.js'),
	syncData = syncdata();

// Browser
// var syncdata = syncdata,
//     syncData = syncdata();

// >> Observable
syncData.observe.setObservable(function(params){
	// Observable Result
	//>> Params
	console.log('Observable Result');
	console.log(params);
	// >> End Params
});

console.log('demo');

// >> CREATE
/*
var item = { Name: 'Mochi', Age: 27, cuid: 'ci6yfbkxl0000334z7f1w8gr7' };

// >> POST
syncData.setRoutes({READ: '/read'});
syncData.read();

syncData.setRoutes({CREATE: '/create'});
syncData.create({ item: item }, function(response) {
	console.log('POST CREATE');
	console.log(response);
});

// >> GET

syncData.setRoutes({CREATE: '/create2'});
syncData.create({ item: item, method:'GET', async: false, data: item }, function(response) {
	console.log('GET CREATE');
	console.log(response);
	console.log(syncData.data());
});
*/

// >> READ 
/*
// >> GET
syncData.setRoutes({READ: '/read'});

syncData.read(null, function(response){
	console.log('GET');
	console.log(response);
});

// >> POST
syncData.setRoutes({READ: '/read2'});

syncData.read({method: 'POST', async: false, data: {name: 'Steven'} }, function(response){
	console.log('POST READ');
	console.log(response);
});
*/

// >> UPDATE
/*
syncData.setRoutes({READ: '/read'});
syncData.read({ async: false });

var item1 = syncData.data()[0];
var item2 = syncData.data()[1];
item1.Name = 'Panfilo';
item2.Name 	= 'Marito';
item2.Age 	= 100;

syncData.setRoutes({UPDATE: '/update'});
syncData.update({ item: item1 }, function(response) {
	console.log('POST UPDATE');
	console.log(response);
});

syncData.setRoutes({UPDATE: '/update2'});
syncData.update({ item: item2, method: 'GET' }, function(response) {
	console.log('GET UPDATE');
	console.log(response);
});
*/

// >> DELETE
/*
syncData.setRoutes({READ: '/read'});
syncData.read({ async: false });
console.log(syncData.data());

var item1 = syncData.data()[1];
var item2 = syncData.data()[0];

syncData.setRoutes({DELETE: '/delete'});
syncData.delete({ cuid: item1.cuid, key: 'ID' }, function(response) {
	console.log('POST DELETE');
	console.log(response);
});

syncData.setRoutes({DELETE: '/delete2'});
syncData.delete({ cuid: item2.cuid, method:'GET' }, function(response) {
	console.log('GET DELETE');
	console.log(response);
});
*/



