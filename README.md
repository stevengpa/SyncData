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
## Inside Array
You can access the inside JS Array or get a Clone of the Array.
```
function data(params)
params: clone (true/false)
returns: JS Array
```
``` javascript
syncData.data({ clone: true }); // []
```

### Create
```
function create(params, callback)
params: item (JS Object to include) | async (true/false) | method (POST/GET)
returns: server response
observable result: 
	item ( {"Name":"Mochi","Age":"27", cuid: "ci71qoczt00003352u90ogcrf"} )
	response ( Ajax response )
	route ( CREATE )
```
``` javascript
var item = { Name: 'Mochi', Age: 27 };

syncData.create({ item: item }, function(response) {
	console.log(response); // Ajax response
	JSON.stringify(syncData.data()); // [{"Name":"Mochi","Age":27,"cuid":"ci71queel00003352uue5y055"}]
});
```

