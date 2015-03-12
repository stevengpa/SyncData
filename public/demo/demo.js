var syncdata = syncdata,
    syncData = syncdata();
/*
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
*/

/*
console.log( syncData.ext().eDate().monthName() );
console.log( syncData.ext().eDate().monthName({ language: 'es'}) );
console.log( syncData.ext().eDate().monthName({ language: 'es', month: '5'}) );

console.log( syncData.ext().eDate().dayName() );
console.log( syncData.ext().eDate().dayName({ language: 'es' }) );
console.log( syncData.ext().eDate().dayName({ language: 'es', day: '6' }) );

console.log( syncData.ext().eFormat().addMiles({ value: '1000' }) );
console.log( syncData.ext().eFormat().addMiles({ value: 1000 }) );

console.log( syncData.ext().eFormat().removeMiles({ value: '1,000' }) );

console.log( syncData.ext().eVal().isNumber({ value: '2,500' }) );
console.log( syncData.ext().eVal().isNumber({ value: '2,500a' }) );

console.log( syncData.ext().eVal().isBlank({ value: '2,500a' }) );
console.log( syncData.ext().eVal().isBlank({ value: '' }) );
console.log( syncData.ext().eVal().isBlank({ value: null }) );

console.log( syncData.ext().eVal().isDate({ value: '12/01/2015' }) );
console.log( syncData.ext().eVal().isDate({ value: '31/01/2015', format: 'DD/MM/YYYY' }) );
console.log( syncData.ext().eVal().isDate({ value: '31/01/2015', format: 'MM/DD/YYYY' }) );

console.log( syncData.ext().eVal().isEmail({ value: 'steven.ars@ars.com' }) );
console.log( syncData.ext().eVal().isEmail({ value: 'steven.ars@com' }) );

*/

/*
console.log( syncData.ext().eDate().shortDate() );
console.log( syncData.ext().eDate().shortDate({ format: 'DDMMYYYY'}) );

console.log( syncData.ext().eDate().middleDate() );
console.log( syncData.ext().eDate().middleDate({ format: 'DDMMYYYY'}) );

console.log( syncData.ext().eDate().largeDate() );
console.log( syncData.ext().eDate().largeDate({ format: 'DDMMYYYY'}) );

console.log( syncData.ext().eDate().longDate() );
console.log( syncData.ext().eDate().longDate({ format: 'DDMMYYYY'}) );
console.log( syncData.ext().eDate().longDate({ value: '25/1/2015', format: 'DD/MM/YYYY'}) );

console.log( syncData.ext().eDate().fromDate() );
console.log( syncData.ext().eDate().fromDate({ value: '03/10/2015'}) );
console.log( syncData.ext().eDate().fromDate({ value: '03/10/2015', format: 'DD/MM/YYYY'}) );

console.log( syncData.ext().eDate().addDays({ value: '03/10/2015', format: 'DD/MM/YYYY', days:1 }) );
console.log( syncData.ext().eDate().addDays({ value: '03/10/2015', format: 'MM/DD/YYYY', days:1 }) );

console.log( syncData.ext().eDate().addMonths({ value: '03/10/2015', format: 'MM/DD/YYYY', months:1 }) );
console.log( syncData.ext().eDate().addMonths({ value: '03/10/2015', format: 'DD/MM/YYYY', months:1 }) );

console.log( syncData.ext().eDate().addYears({ value: '03/10/2015', format: 'DD/MM/YYYY', years:1 }) );
console.log( syncData.ext().eDate().addYears({ value: '03/10/2015', format: 'MM/DD/YYYY', years:1 }) );

*/

var tempDateTime = new Date()

console.log( 'tempDateTime = ' + tempDateTime  );
console.log( syncData.ext().eDate().fromHours() );
console.log( syncData.ext().eDate().fromHours({ value: tempDateTime }) );
console.log(  );
console.log(  );
console.log(  );
console.log(  );