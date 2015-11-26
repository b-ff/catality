/**
 * GitHub API Service
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 27.11.15
 */

angular.module('cato.global').factory('apiService', ['$http', '$resource', 'base64Service', 'authService', apiService]);

function apiService($http, $resource, base64Service, authService, apiService) {
	var service = {},
		__resource = $resource('https://api.github.com/');

	// ...

	return service;
}