angular.module('apiClient').

	factory('apiClient', function() {
	
	  	return {

	  		urls: {
	  			auth: 			'http://127.0.0.1:5000/auth',
	  			user: 			'http://127.0.0.1:5000/user', 
	  			mjs: 			'http://127.0.0.1:5000/mjs', 
	  			wizard_search: 	'http://127.0.0.1:5000/wsearch',
	  			item: 			'http://127.0.0.1:5000/item',
	  			suggest: 		'http://127.0.0.1:5000/suggest'
	  		}
	  	};
	});