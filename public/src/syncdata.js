var $ 		= require('jquery'),
	cuid 	= require('cuid');

 syncdata = function() {
	
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
		 
		 if ((params[prop] == null) || (params[prop] == 'undefined'))
		 { throw 'Missing property ' + prop + '.'; }
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
		create	: function create(params) {
			validateRoute({ ROUTE: 'CREATE', VALUE: routes.CREATE });
			validateProps(params, 'item');
			
			params = params || {};
			callback = callback || function() {};
			
			params.async 	= params.async || true;
			params.method 	= params.method || 'GET';
			params.data 	= params.item || {};
			params.cuid 	= params.cuid || true;
			
			// Create Copy of the Item
			var copiedObject = {};
			$.extend(copiedObject, params.data);
			
			// Ajax Async
			if (params.async == true) {
				// POST
				if (params.method.toUpperCase() == 'POST') {
					$.post(routes.CREATE, params.data, 
						   function(response) {
								Data = applyCuid(response);
								async(obs().execute, [{ route: 'CREATE', response: response}]);
								callback(response);
							}
				  	);									
				}
				
				// GET
				if (params.method.toUpperCase() == 'GET') {
					$.get(routes.CREATE, params.data, 
						   function(response){ 
								Data = applyCuid(response);
								async(obs().execute, [{ route: 'CREATE', response: response}]);
								callback(response);
							}
				  	);									
				}
			} else {
			// Ajax Sync
				response = $.ajax({ url: routes.CREATE, type: params.method, data: params.data, async:false }).responseText;
				Data = applyCuid(response);
				async(obs().execute, [{ route: 'CREATE', response: response}]);
				callback(response);
			}
			
			return this;
		},
		
		read: function read(params, callback) {
			
			validateRoute({ ROUTE: 'READ', VALUE: routes.READ });
			
			params = params || {};
			callback = callback || function() {};
			
			params.async 	= params.async || true;
			params.method 	= params.method || 'GET';
			params.data 	= params.data || {};
			params.cuid 	= params.cuid || true;
			
			// Ajax Async
			if (params.async == true) {
				// POST
				if (params.method.toUpperCase() == 'POST') {
					$.post(routes.READ, params.data, 
						   function(response) {
								Data = applyCuid(response);
								async(obs().execute, [{ route: 'READ', response: response}]);
								callback(response);
							}
				  	);									
				}
				
				// GET
				if (params.method.toUpperCase() == 'GET') {
					$.get(routes.READ, params.data, 
						   function(response){ 
								Data = applyCuid(response);
								async(obs().execute, [{ route: 'READ', response: response}]);
								callback(response);
							}
				  	);									
				}
			} else {
			// Ajax Sync
				response = $.ajax({ url: routes.READ, type: params.method, data: params.data, async:false }).responseText;
				Data = applyCuid(response);
				async(obs().execute, [{ route: 'READ', response: response}]);
				callback(response);
			}
			
			return this;
		},
		
		setRoutes: function setRoutes(params) {
			routes.CREATE 	= params.CREATE,
			routes.READ		= params.READ,
			routes.UPDATE 	= params.UPDATE,
			routes.DELETE 	= params.DELETE
		},
		
		observe: obs()
	}
	
};

module.exports = syncdata();