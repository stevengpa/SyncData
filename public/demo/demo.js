var syncdata = syncdata,
    syncData = syncdata();

syncData.setRoutes({ 
					CREATE	: '/create',
					READ	: '/read',
					UPDATE	: '/update',
					DELETE	: '/delete'
				  });

syncData.observe.setObservable(function(params){
	console.log('Observable Result');
	console.log(params);
	console.log(JSON.stringify(params));
});


syncData.data({ clone: true });

// Create
var item = { Name: 'Mochi', Age: 27, cuid: 'ci71rh0fk00003352ijew3d28' };

syncData.create({ item: item, async: false }, function(response) {
	console.log(JSON.stringify(response));
	console.log(JSON.stringify(syncData.data()));
});

console.log(syncData.data());

// READ
syncData.read({ async: false}, function(response) {
	console.log(response);
	console.log(JSON.stringify(syncData.data()));
});

// UPDATE
var item = syncData.data()[0];
	item.Name = 'Panfilo';
	item.ID = 1;

syncData.update({ item: item }, function(response) {
	console.log(JSON.stringify(response));
	console.log(JSON.stringify(syncData.data()));
});

// DELETE
var item = syncData.data()[0];

syncData.delete({ cuid: item.cuid, key: 'ID' }, function(response) {
	console.log(JSON.stringify(response));
	console.log(JSON.stringify(syncData.data()));
});

// SELECT
var item2 = syncData.select({ cuid: 'ci71rh0fk00003352ijew3d28'});
console.log(JSON.stringify(item2));



