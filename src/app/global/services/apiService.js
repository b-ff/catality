/**
 * GitHub API Service
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 27.11.15
 */

angular.module('catality.global').factory('apiService', ['$http', '$resource', 'base64Service', 'authService', apiService]);

function apiService($http, $resource, base64Service, authService) {
	var service = {};

	var __API = 'https://api.github.com/';

	var __resource = $resource(__API, {}, {

		// Repositories

		'repositories_list': {
			url: __API + '/user/repos',
			method: 'GET'
		},
		'repositories_get': {
			url: __API + '/repos/:owner/:repo',
			method: 'GET',
			params: {
				owner: authService.getUserLogin,
				repo: ''
			}
		},

		// Commits

		'commits': {},

		// Users

		'users': {},

		// Rate Limit

		'rateLimit': {
			url: __API + 'rate_limit',
			method: 'GET'
		}
	});

	service.getActions = function() {
		return __resource;
	};

	return service;
}