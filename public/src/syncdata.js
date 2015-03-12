var $ 		= require('jquery'),
	cuid 	= require('cuid'),
	moment 	= require('moment');

 syncdata = function syncdata() {

	var routes = {
		CREATE: null,
		READ: null,
		UPDATE: null,
		DELETE: null
	};

	var Data = [];

	 // Attach Libs
	(this.hasOwnProperty('global')) ? global.$ = $ : window.$ = $;
	(this.hasOwnProperty('global')) ? global.cuid = cuid : window.cuid = cuid;
	(this.hasOwnProperty('global')) ? global.moment = moment : window.moment = moment;
	 
	async: function async(fn, arguments, callback, ms){

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

		console.log(typeof params.item);
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

			params.currentitem = this.select({ cuid: params.item['cuid'], clone: false });

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
		observe: obs(),
		
		// FUNCTIONALITIES
		ext: function ext() {
			return {
				
				// >> Date
				eDate: function eDate() {
					
					return {
						
						monthName: function monthName(params) {
							params = params || {};

							var todayDate = new Date();
							(params.hasOwnProperty('month')) ? params.month = params.month : params.month = todayDate.getMonth();
							(params.hasOwnProperty('language')) ? params.language = params.language : params.language = 'en';	
							
							params.month = parseInt(params.month) + 1;
							var monthName = '';

							switch(params.language.toLowerCase()) 
							{
								case 'en':
									monthName = [null, 'January','February','March','April','May','June',
												 'July', 'August','September','October','November','December'];
									break;
								case 'es':
									monthName = [null, 'Enero','Febrero','Marzo','Abril','Mayo','Junio',
												 'Julio', 'Agosto','Setiembre','Octubre','Noviembre','Diciembre'];
									break;
							}

							return monthName[params.month];
						},
						
						dayName: function dayName(params) {
							params = params || {};

							var todayDate = new Date();
							(params.hasOwnProperty('day')) ? params.day = (parseInt(params.day) - 1) : params.day = todayDate.getDay();
							(params.hasOwnProperty('language')) ? params.language = params.language : params.language = 'en';
							
							var dayName = '';
							switch(params.language.toLowerCase()) 
							{
								case 'en':
									dayName = ['Sunday','Monday','Tuesday','Wednesday',
											   'Thursday','Friday','Saturday'];
									break;
								case 'es':
									dayName = [	'Domingo','Lunes','Martes','Miércoles', 
											   'Jueves','Viernes','Sábado'];
									break;
							}

							return dayName[params.day];
						},
						
						shortDate: function shortDate(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							return moment(params.value, params.format).format('L');
						},
						
						middleDate: function middleDate(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							return moment(params.value, params.format).format('LL');
						},
						
						largeDate: function largeDate(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							return moment(params.value, params.format).format('MMMM Do, YYYY');
						},
						
						longDate: function longDate(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							return moment(params.value, params.format).format('YYYYMMDD');
						},
						
						fromDate: function fromDate(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							var longDate = this.longDate({ value: params.value, format: params.format });
							
							return moment(longDate, 'YYYYMMDD').fromNow();
						},
						
						fromHours: function fromHours(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = null;
							
							if (params.value == null)
								return moment(new Date()).startOf('hour').fromNow();
							else
								return moment(params.value).startOf('hour').fromNow();
						},
						
						fromMinutes: function fromMinutes(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = null;
							
							if (params.value == null)
								return moment(new Date()).startOf('minute').fromNow();
							else
								return moment(params.value).startOf('minutes').fromNow();
						},
						
						addDays: function addDays(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							(params.hasOwnProperty('days')) ? params.days = parseInt(params.days) : params.days = 0;
							
							return moment(params.value, params.format).add(params.days, 'days').format('L');
						},
						
						addMonths: function addMonths(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							(params.hasOwnProperty('months')) ? params.months = parseInt(params.months) : params.months = 0;
							
							return moment(params.value, params.format).add(params.months, 'months').format('L');
						},
						
						addYears: function addYears(params) {
							params = params || {};
							
							(params.hasOwnProperty('value')) ? params.value = params.value : params.value = moment().format('l');
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toUpperCase() : params.format = 'MMDDYYYY';
							
							(params.hasOwnProperty('years')) ? params.years = parseInt(params.years) : params.years = 0;
							
							return moment(params.value, params.format).add(params.years, 'years').format('L');
						},
						
					};
				},
				
				// >>Format
				eFormat: function eFormat()
				{
					
					return {
						
						addMiles: function addMiles(params) {
							params = params || {};
							validateProps(params, 'value');

							var value = params.value.toString().trim();

							value += '';
							x = value.split('.');
							x1 = x[0];
							x2 = x.length > 1 ? '.' + x[1] : '';
							var rgx = /(\d+)(\d{3})/;
							while (rgx.test(x1)) {
								x1 = x1.replace(rgx, '$1' + ',' + '$2');
							}
							
							return x1 + x2;
						},
						
						removeMiles: function removeMiles(params) {
							params = params || {};
							validateProps(params, 'value');
							
							var value = params.value.toString().trim();
							value = parseFloat(value.replace(/,/g, ''));

							return value;
						}

					};
				},
				
				// >> Validation
				eVal: function eVal() {
					
					return {
						
						isNumber: function isNumber(params) {
							params = params || {};
							validateProps(params, 'value');
							
							var value = params.value.toString();

							value = value.replace(",","");

							if (parseFloat(value)!= value)
								return false;
							else
								return true;
						},
						
						isBlank: function isBlank(params) {
							params = params || {};
							validateProps(params, 'value');
							
							// Validate is null
							if (params.value == null) return true;
							
							var value = params.value.toString().trim();

							// Validate by length
							if (value.length == 0)
								return true;
							else
								return false;
						},
						
						isDate: function isDate(params) {
							params = params || {};
							validateProps(params, 'value');
							
							(params.hasOwnProperty('format')) ? params.format = params.format.toString().toLowerCase() : params.format = 'mm/dd/yyyy';

							  var delimiter = /[^mdy]/.exec(params.format)[0],
							  theFormat = params.format.split(delimiter),
							  theDate = params.value.split(delimiter),

							  isDate = function (date, format) {
								var m, d, y
								for (var i = 0, len = format.length; i < len; i++) {
								  if (/m/.test(format[i])) m = date[i]
								  if (/d/.test(format[i])) d = date[i]
								  if (/y/.test(format[i])) y = date[i]
								}
								return (
								  m > 0 && m < 13 &&
								  y && y.length === 4 &&
								  d > 0 && d <= (new Date(y, m, 0)).getDate()
								)
							  }

							  return isDate(theDate, theFormat)
						},
						
						isEmail: function isEmail(params) {
							params = params || {};
							validateProps(params, 'value');
							
							params.value = params.value.toString().trim();
		
							var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
							return re.test(params.value);
						}
						
					};
					
				}
				
			}
		}
	}

};

module.exports = syncdata;