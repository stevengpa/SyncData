var $ 		= require('jquery'),
	cuid 	= require('cuid');

 syncdata = function syncdata() {
	
	var routes = {
		CREATE: null,
		READ: null,
		UPDATE: null,
		DELETE: null
	};
	
	var Data = [];
	
	window.async = function(fn, arguments, callback, ms){
			
			// Save Params in an Object
			var run = { fn: fn, arguments: arguments, callback: callback };
		
			// Execute Async
			setTimeout(function asyncF(){
				run.callback = run.callback || function () {};
				run.callback(run.fn.apply(undefined, run.arguments));
			}, (ms == undefined) ? 0 : ms);
	}
	
	window.$ = $;
	 
	window.cuid = cuid;
	 
	applyCuid: function applyCuid(response) {
		
		response = response || {};
		if (typeof(response) == 'string')
			response = JSON.parse(response);
		
		for (i = 0; i < response.length; i++)
			response[i]['cuid'] = cuid();
		
		return response;
	}
	 
	validateRoute: function validateRoute(params) {
		if (params.VALUE == null) throw 'Route ' + params.ROUTE + ' is pending to set';
		if (params.VALUE == 'undefined') throw 'Route ' + params.ROUTE + ' is pending to set';
		if (params.VALUE.toString().length == 0) throw 'Route ' + params.ROUTE + ' is pending to set';
	}
	
	validateProps: function validateProps(params, prop) {
		
		 if ((params == null) || (params == 'undefined'))
		 { throw 'Missing parameters.'; }
		 
		 if (!params.hasOwnProperty(prop))
		 { throw 'Missing property ' + prop + '.'; }
	 }
	
	deleteItem: function deleteItem(params) {
		validateProps(params, 'cuid');
		var itemIndex = Data.map(function(data) { return data.cuid; }).indexOf(params.cuid);
		
		if (itemIndex >= 0)
			Data.splice(itemIndex, 1);
		else
			throw 'Item was not found through cuid ' + params.cuid;
	}
	
 	updateProps : function updateProps(source, dest) {
		try {
			
			for (var key in source) {

				if(dest.hasOwnProperty(key)){
					dest[key] = source[key];
				}
				
			}
		}
		catch (err)
		{ throw err; }
			
	}
	
	cloneObject : function cloneObject(params) {
		
		validateProps(params, 'item');
		if(params.item == null || typeof(params.item) != 'object') throw 'Item is not an object.';

		var strObject = JSON.stringify(params.item);
		
		return JSON.parse(strObject);
	}
	 
	var observableCallback = undefined;
	obs: function obs() {

		execute: function execute(params)
		{
			observableCallback = observableCallback || function() {};
			observableCallback(params);
		}
		
		getObservable: function getObservable()
		{
			return observableCallback;
		}
		
		setObservable: function setObservable(fn)
		{
			fn = fn || function() {};
			observableCallback = fn;
		}
		
		return {
			execute: execute,
			getObservable: getObservable,
			setObservable: setObservable
		};
	}
	 
	return {
		
		// CRUD
		select: function select(params) {
			
			params 		= params || {};
			
			validateProps(params, 'cuid');
			(params.hasOwnProperty('clone')) ? params.clone = params.clone : params.clone = true;
			
			var item = Data.filter(function (x) { return x.cuid == params.cuid; })[0];
			
			return (params.clone) ? cloneObject({ item: item}) : item;
		},
		
		create: function create(params, callback) {
			
			validateRoute({ ROUTE: 'CREATE', VALUE: routes.CREATE });
			validateProps(params, 'item');
			
			params = params || {};
			callback = callback || function() {};
			
			(params.hasOwnProperty('async')) 	? params.async = params.async : params.async = true;
			(params.hasOwnProperty('method')) 	? params.method = params.method : params.method = 'POST';
			(params.hasOwnProperty('item')) 	? params.item = params.item : params.item = {};
						
			// Assign cuid in case item doesn't have this prop
			if (!params.item.hasOwnProperty('cuid'))
				params.item['cuid'] = cuid();
			
			// Ajax Async
			if (params.async == true) {
				// POST
				if (params.method.toUpperCase() == 'POST') {
					$.post(routes.CREATE, params.item, 
						   function(response) {
								Data.push(params.item);
								async(obs().execute, [{ route: 'CREATE', response: response, item: params.item }]);
								callback(response, params.item);
							}
				  	);									
				}
				
				// GET
				if (params.method.toUpperCase() == 'GET') {
					$.get(routes.CREATE, params.item, 
						   function(response){ 
								Data.push(params.item);
								async(obs().execute, [{ route: 'CREATE', response: response, item: params.item }]);
								callback(response, params.item );
							}
				  	);									
				}
			} else {
			// Ajax Sync
				var response = $.ajax({ url: routes.CREATE, type: params.method, data: params.item, async:false }).responseText;
				Data.push(params.item);
				async(obs().execute, [{ route: 'CREATE', response: response, item: params.item }]);
				callback(response, params.item);
			}
			
			return this;
		},
		
		read: function read(params, callback) {
			
			validateRoute({ ROUTE: 'READ', VALUE: routes.READ });
			
			params 		= params || {};
			callback 	= callback || function() {};
			
			(params.hasOwnProperty('async')) 	? params.async = params.async : params.async = true;
			(params.hasOwnProperty('method')) 	? params.method = params.method : params.method = 'GET';
			(params.hasOwnProperty('data')) 	? params.data = params.data : params.data = {};
			(params.hasOwnProperty('cuid')) 	? params.cuid = params.cuid : params.cuid = true;
			
			// Ajax Async
			if (params.async == true) {
				// POST
				if (params.method.toUpperCase() == 'POST') {
					$.post(routes.READ, params.data, 
						   function(response) {
								Data = applyCuid(response);
								async(obs().execute, [{ route: 'READ', response: Data}]);
								callback(Data);
							}
				  	);									
				}
				
				// GET
				if (params.method.toUpperCase() == 'GET') {
					$.get(routes.READ, params.data, 
						   function(response){ 
								Data = applyCuid(response);
								async(obs().execute, [{ route: 'READ', response: Data}]);
								callback(Data);
							}
				  	);									
				}
			} else {
			// Ajax Sync
				var response = $.ajax({ url: routes.READ, type: params.method, data: params.data, async:false }).responseText;
				Data = applyCuid(response);
				async(obs().execute, [{ route: 'READ', response: Data}]);
				callback(Data);
			}
			
			return this;
		},
		
		delete: function del(params, callback) {
			
			validateRoute({ ROUTE: 'DELETE', VALUE: routes.DELETE });
			validateProps(params, 'cuid');
			
			params = params || {};
			callback = callback || function() {};
			
			(params.hasOwnProperty('async')) 	? params.async = params.async : params.async = true;
			(params.hasOwnProperty('key')) 		? params.key = params.key : params.key = null;
			(params.hasOwnProperty('method')) 	? params.method = params.method : params.method = 'POST';
			
			params.data2send = {};
			params.item = this.select({ cuid: params.cuid });
			
			// If there is a key then send just the key to the server
			if (params.key != null)
				params.data2send[params.key] = params.item[params.key];
			else
				params.data2send = params.item;
			
			// Ajax Async
			if (params.async == true) {
				// POST
				if (params.method.toUpperCase() == 'POST') {
					$.post(routes.DELETE, params.data2send,
						   function(response) {
								deleteItem({ cuid: params.item.cuid });
								async(obs().execute, [{ route: 'DELETE', response: response, item: params.item }]);
								callback(response, params.item);
							}
				  	);									
				}
				
				// GET
				if (params.method.toUpperCase() == 'GET') {
					$.get(routes.DELETE, params.data2send, 
						   function(response){ 
								deleteItem({ cuid: params.item.cuid });
								async(obs().execute, [{ route: 'DELETE', response: response, item: params.item }]);
								callback(response, params.item );
							}
				  	);									
				}
			} else {
			// Ajax Sync
				var response = $.ajax({ url: routes.DELETE, type: params.method, data: params.data2send, async:false }).responseText;
				deleteItem({ cuid: params.item.cuid });
				async(obs().execute, [{ route: 'DELETE', response: response, item: params.item }]);
				callback(response, params.item);
			}
			
			return this;
		},
		
		update: function update(params, callback) {
			
			validateRoute({ ROUTE: 'UPDATE', VALUE: routes.UPDATE });
			validateProps(params, 'item');
			validateProps(params.item, 'cuid');
			
			params = params || {};
			callback = callback || function() {};
			
			(params.hasOwnProperty('async')) 	? params.async = params.async : params.async = true;
			(params.hasOwnProperty('method')) 	? params.method = params.method : params.method = 'POST';
			
			params.currentitem = this.select({ cuid: params.item['cuid'] });
			
			if (params.currentitem == null) throw 'Item was not found by cuid ' + params.item['cuid'];
			if (params.currentitem == 'undefined') throw 'Item was not found by cuid ' + params.item['cuid'];
			
			var clone = cloneObject({ item: params.currentitem });
			
			// Ajax Async
			if (params.async == true) {
				// POST
				if (params.method.toUpperCase() == 'POST') {
					$.post(routes.UPDATE, params.item,
						   function(response) {
								updateProps(params.item, params.currentitem);
								async(obs().execute, [{ route: 'UPDATE', response: response, item: clone }]);
								callback(response, clone);
							}
				  	);									
				}
				
				// GET
				if (params.method.toUpperCase() == 'GET') {
					$.get(routes.UPDATE, params.item, 
						   function(response){ 
								updateProps(params.item, params.currentitem);
								async(obs().execute, [{ route: 'UPDATE', response: response, item: clone }]);
								callback(response, clone );
							}
				  	);									
				}
			} else {
			// Ajax Sync
				var response = $.ajax({ url: routes.UPDATE, type: params.method, data: params.item, async:false }).responseText;
				updateProps(params.item, params.currentitem);
				async(obs().execute, [{ route: 'UPDATE', response: response, item: clone }]);
				callback(response, clone);
			}
			
			return this;
		},
		
		// DATA
		data: function data(params) {
			params 		= params || {};
			(params.hasOwnProperty('clone')) ? params.clone = params.clone : params.clone = true;
			
			return (params.clone) ? cloneObject({ item: Data}) : Data;
		},
		
		// ROUTES
		setRoutes: function setRoutes(params) {
			routes.CREATE 	= params.CREATE,
			routes.READ		= params.READ,
			routes.UPDATE 	= params.UPDATE,
			routes.DELETE 	= params.DELETE
		},
		
		getRoutes: function getRoutes(params) {
			return routes;
		},
		
		// OBSERVABLE
		observe: obs()
	}
	
};

module.exports = syncdata;