# SyncData
SyncData is a little Browserify | Node module which manage inside a JavaScript Array + CRUD functionalities + Cache ID through [CUID by Eric Elliot](https://github.com/ericelliott/cuid). When you use the CRUD functionalities, those trigger the actions to the server via Ajax and modify the JavaScript Array, if the Ajax request fails, you have an observable to take the necessary actions over the JavaScript Array.

## Implementation

#### Browser
``` html
<script src="dist/browser-syncdata.js"></script>
```
``` javascript
var syncdata = syncdata,
    syncData = syncdata();
```

#### Browserify | Node
``` javascript
var syncdata = require('./syncdata.js'),
	syncData = syncdata();
```
## setRoutes
It is important to set the server routes where you will send & request information to the server.
```
setRoutes(params)
params: CREATE | READ | UPDATE | DELETE
```
``` javascript
syncData.setRoutes({ 
			CREATE	: '/create',
			READ	: '/read',
			UPDATE	: '/update',
			DELETE	: '/delete'
		  });
```
## setObservable
You can observe the CRUD action, item managed and Ajax result.
```
function setObservable(fn)
returns: route (CREATE - READ - UPDATE - DELETE) | response (Ajax Result) | item (JS Object to include)
```
``` javascript
syncData.observe.setObservable(function(params){
	console.log('Observable Result');
	console.log(params);
});
```
## Internal Array
You can access the internal JS Array or get a Clone of the Array.
```
function data(params)
params: clone (true/false)
returns: JS Array
```
``` javascript
syncData.data({ clone: true }); // []
```

### Create
Add an item to the internal array and send the ajax request to the server.
```
function create(params, callback)
params: item (JS Object to include) | async (true/false) | method (POST/GET)
returns: server response
observable result: 
	item ( {"Name":"Mochi","Age":"27", cuid: "ci71rh0fk00003352ijew3d28"} )
	response ( Ajax response )
	route ( CREATE )
```
``` javascript
var item = { Name: 'Mochi', Age: 27 };

syncData.create({ item: item }, function(response) {
	console.log(response); // Ajax response
	JSON.stringify(syncData.data()); // [{"Name":"Mochi","Age":27,"cuid":"ci71rh0fk00003352ijew3d28"}]
});
```

### Read
Fill the internal array through an ajax request to the server, it should return an array (JS/JSON).
```
function read(params, callback)
params: item (JS Object to include) | async (true/false) | method (POST/GET) | data (Ajax data)
returns: server response
observable result: 
	item ( {"Name":"Mochi","Age":27,"cuid":"ci71rh0fk00003352ijew3d28"} )
	response ( Ajax response )
	route ( READ )
```
``` javascript
syncData.read(function(response) {
	console.log(response); // Ajax response
	console.log(JSON.stringify(syncData.data())); // [{"Name":"Mochi","Age":27,"cuid":"ci71rh0fk00003352ijew3d28"}]
});
```

### Update
Pass the item with the changes and it is updated the internal array and send the ajax request to the server. The item should contain the cuid property.
```
function update(params, callback)
params: item (JS Object to include with cuid property) | async (true/false) | method (POST/GET) | data (Ajax data)
returns: server response
observable result: 
	item ( {"Name":"Mochi","Age":27,"cuid":"ci71rh0fk00003352ijew3d28"} )
	response ( Ajax response )
	route ( UPDATE )
```
``` javascript
var item = syncData.data()[0];
	item.Name = 'Panfilo';
	item.ID = 1;

syncData.update({ item: item }, function(response) {
	console.log(response); // Ajax response
	console.log(JSON.stringify(syncData.data())); // [{"Name":"Panfilo","Age":27,"cuid":"ci71rh0fk00003352ijew3d28"}]
});
```
### Delete
Pass the cuid of the item to delete and it is deleted in the internal array and send the ajax request to the server. The item should contain the cuid property.
```
function delete(params, callback)
params: cuid (cuid of the item to delete) | async (true/false) | method (POST/GET) | key (Ajax Send just one Property Field of the item e.g: 'ID')
returns: server response
observable result: 
	item ( {"Name":"Mochi","Age":"27","ID":1,"cuid":"ci71rh0fk00003352ijew3d28"} )
	response ( Ajax response )
	route ( DELETE )
```
``` javascript
var item = syncData.data()[0];

syncData.update({ cuid: item.cuid }, function(response) {
	console.log(response); // Ajax response
	console.log(JSON.stringify(syncData.data())); // []
});
```

### Select
Search an item by cuid in the internal array (No ajax method involved)
```
function select(params)
params: cuid (cuid of the item to delete) | clone (true/false)
returns: object
```
``` javascript
var item = syncData.select({ cuid: 'ci71rh0fk00003352ijew3d28'});
console.log(JSON.stringify(item)); // {"Name":"Mochi","Age":27,"cuid":"ci71rh0fk00003352ijew3d28"}
```

### Extension <i>ext()</i>
It is an object which contains sub objects with different purposes, for example: eVal, it contains functions
like: validates isNumber, isBlank, isEmail, another example... eDate, this contains: monthName, dayName and so on.

#### eDate()

#### eDate().monthName()
```
function monthName(params)
params: month (month number) | language (en/es)
returns: string
```
``` javascript
syncData.ext().eDate().monthName(); // Current Month Name in English
syncData.ext().eDate().monthName({ language: 'es'}); // Current Month Name in Spanish
syncData.ext().eDate().monthName({ language: 'es', month: '5'}); // Junio
```

#### eDate().dayName()
```
function dayName(params)
params: day (day number) | language (en/es)
returns: string
```
``` javascript
syncData.ext().eDate().dayName(); // Current Day Name in English
syncData.ext().eDate().dayName({ language: 'es'}); // Current Day Name in Spanish
```

#### eDate().shortDate()
```
function shortDate(params)
params: value (date) | format (Date Format)
returns: string
```
``` javascript
syncData.ext().eDate().shortDate(); // Example: 03/12/2015
syncData.ext().eDate().shortDate({ format: 'DDMMYYYY'}); // Example: 12/03/2015
```

#### eDate().middleDate()
```
function middleDate(params)
params: value (date) | format (Date Format)
returns: string
```
``` javascript
syncData.ext().eDate().middleDate(); // Example: March 12, 2015
syncData.ext().eDate().middleDate({ format: 'DDMMYYYY'}); // Example: December 3, 2015
```

#### eDate().largeDate()
```
function largeDate(params)
params: value (date) | format (Date Format)
returns: string
```
``` javascript
syncData.ext().eDate().largeDate(); // Example: March 12th, 2015
syncData.ext().eDate().largeDate({ format: 'DDMMYYYY'}); // Example: December 3rd, 2015
```

#### eDate().longDate()
```
function longDate(params)
params: value (shortDate string) | format (Date Format)
returns: string
```
``` javascript
syncData.ext().eDate().longDate(); // Example: 20150312
syncData.ext().eDate().longDate({ format: 'DDMMYYYY'}); // Example: 20151203
syncData.ext().eDate().longDate({ value: '25/1/2015', format: 'DD/MM/YYYY'}); // Example: 20150125
```

#### eDate().fromDate() / eDate().fromHours() / eDate().fromMinutes()
```
function fromDate(params)
params: value (shortDate string) | format (Date Format)
returns: string
```
``` javascript
syncData.ext().eDate().fromDate(); // Example: 19 hours ago
syncData.ext().eDate().fromDate({ value: '03/10/2015'}); // Example: 3 days ago
syncData.ext().eDate().fromDate({ value: '03/10/2015', format: 'DD/MM/YYYY'}); // Example: in 7 months
```

#### eDate().addDays()
```
function addDays(params)
params: value (shortDate string) | format (Date Format) | days (number of days to add)
returns: string
```
``` javascript
syncData.ext().eDate().addDays({ days:1 }); // Example: 03/13/2015
syncData.ext().eDate().addDays({ value: '03/10/2015', format: 'DD/MM/YYYY', days:1 }); // Example: 10/04/2015
syncData.ext().eDate().addDays({ value: '03/10/2015', format: 'MM/DD/YYYY', days:1 }); // Example: 03/11/2015
```

#### eDate().addMonths()
```
function addMonths(params)
params: value (shorDate string) | format (Date Format) | months (number of months to add)
returns: string
```
``` javascript
syncData.ext().eDate().addMonths({ months:1 }); // Example: 04/12/2015
syncData.ext().eDate().addMonths({ value: '03/10/2015', format: 'MM/DD/YYYY', months:1 }); // Example: 04/10/2015
syncData.ext().eDate().addMonths({ value: '03/10/2015', format: 'DD/MM/YYYY', months:1 }); // Example: 11/03/2015
```

#### eDate().addYears()
```
function addYears(params)
params: value (shortDate string) | format (Date Format) | years (number of years to add)
returns: string
```
``` javascript
syncData.ext().eDate().addYears({ years:1 }); // Example: 03/12/2016
syncData.ext().eDate().addYears({ value: '03/10/2015', format: 'DD/MM/YYYY', years:1 }); // Example: 10/03/2016
syncData.ext().eDate().addYears({ value: '03/10/2015', format: 'MM/DD/YYYY', years:1 }); // Example: 03/10/2016
```

#### eDate().now()
```
function now()
returns: string
```
``` javascript
syncData.ext().eDate().now(); // Example: 2015-03-12, 7:14:09 pm
```
#### eFormat()

#### eFormat().addMiles()
```
function addMiles(params)
params: value (number/string)
returns: string
```
``` javascript
syncData.ext().eFormat().addMiles({ value: '1000' }); // 1,000
syncData.ext().eFormat().addMiles({ value: 1000 }); // 1,000
```

#### eFormat().removeMiles()
```
function removeMiles(params)
params: value (string)
returns: float
```
``` javascript
syncData.ext().eFormat().removeMiles({ value: '1,000' }); // 1000
```

#### eVal()

#### eVal().isNumber()
```
function isNumber(params)
params: value (number/string)
returns: true/false
```
``` javascript
syncData.ext().eVal().isNumber({ value: '2,500' }); // true
syncData.ext().eVal().isNumber({ value: '2,500a' }); // false
```

#### eVal().isBlank()
```
function isBlank(params)
params: value (number/string)
returns: true/false
```
``` javascript
syncData.ext().eVal().isBlank({ value: '2,500a' }); // false
syncData.ext().eVal().isBlank({ value: '' }); // true
syncData.ext().eVal().isBlank({ value: null }); // true
```
#### eVal().isDate()
```
function isDate(params)
params: value (shortDate string) | format (Date Format)
returns: true/false
```
``` javascript
syncData.ext().eVal().isDate({ value: '12/01/2015' }); // true
syncData.ext().eVal().isDate({ value: '31/01/2015', format: 'DD/MM/YYYY' }); // true
syncData.ext().eVal().isDate({ value: '31/01/2015', format: 'MM/DD/YYYY' }); // false
```
#### eVal().isEmail()
```
function isEmail(params)
params: value (email string)
returns: true/false
```
``` javascript
syncData.ext().eVal().isEmail({ value: 'steven.ars@ars.com' }); // true
syncData.ext().eVal().isEmail({ value: 'steven.ars@com' }); // false
```

#### eSecurity()

#### eSecurity().encrypt()
```
function encrypt(params)
params: value (string to encrypt) | token (Hash string)
returns: { encrypted, token }
```
``` javascript
syncData.ext().eSecurity().encrypt({ value: 'Steven' }); // Object {token: "ci76xqrxp000032566nbk822h", encrypted: "U2FsdGVkX19zqWXY+GFhqCXbu7BGW1HFqC5Sgt/A+2c="}
syncData.ext().eSecurity().encrypt({ value: 'Steven', token: '123' }); // Object {token: "123", encrypted: "U2FsdGVkX19ff8dbBucraT7HXm3nW10i1Z7TOLMFQi0="}
```

#### eSecurity().decrypt()
```
function decrypt(params)
params: value (string to decrypt) | token (Hash string)
returns: { decrypted, token }
```
``` javascript
syncData.ext().eSecurity().decrypt({ value: 'U2FsdGVkX1/FDt3HsDRceF8+2IFBM/6MW5jorbjlURs=', token: '123' }); // Object {token: "123", decrypted: "Steven"} 
```

### jQuery, cuid, moment, crypto - Global Scope
SyncData attached to the <i>window or global</i> objects the jQuery and Cuid literal objects
```
global.$        / window.$
global.cuid     / window.cuid
global.moment   / window.moment
global.cryptojs / window.cryptojs
```
