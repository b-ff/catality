/**
 * Authentication service
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15
 */

angular.module('cato.admin').factory('authService', ['$http', '$resource', 'base64Service', authService]);

function authService($http, $resource, base64Service) {
	var service = {},
		__isLogged = false,
		__login = '',
		__pass = '',
		__twoFactorRequired = false,
		__accountData = null;

	service.resource = $resource('https://api.github.com/user', {}, {
		'authenticate': {
			method: 'GET'
		}
	});

	service.getEncodedAuthData = function () {
		return base64Service.encode(__login + ':' + __pass);
	};

	service.isAuthorized = function () {
		return __isLogged;
	};

	service.isTwoFactorRequired = function () {
		return __twoFactorRequired;
	};

	service.auth = function (login, password) {
		__login = login;
		__pass = password;

		console.log(__login, __pass, service.getEncodedAuthData());

		$http.defaults.headers.common['Authorization'] = 'Basic ' + service.getEncodedAuthData();

		var promise = service.resource.authenticate().$promise;

		promise.then(function (response) {
			__isLogged = true;
			__accountData = response;
		}, function (err) {
			var headers = err.headers();

			__isLogged = false;

			if (err.status === 401) {
				if (headers['x-github-otp']) {
					if (headers['x-github-otp'].match(/^required\;/i)) {
						__twoFactorRequired = true;

						return;
					}
				}
			}

			service.login = '';
			service.pass = '';
			delete $http.defaults.headers.common['Authorization'];
		});

		return promise;
	};

	service.logOut = function () {
		__isLogged = false;
		__accountData = null;
	};

	return service;
}