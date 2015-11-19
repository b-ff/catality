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

	service.resource = $resource('https://api.github.com/', {}, {
		'authenticate': {
			url   : 'https://api.github.com/authorizations',
			method: 'POST'
		},
		'getProfile'  : {
			url: 'https://api.github.com/user',
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

	service.setAuthData = function (login, password) {
		__login = login;
		__pass = password;

		$http.defaults.headers.common['Authorization'] = 'Basic ' + service.getEncodedAuthData();
	};

	service.resetAuthData = function () {
		__login = '';
		__pass = '';
		__twoFactorRequired = false;
		delete $http.defaults.headers.common['Authorization'];
	};

	service.auth = function (login, password) {
		service.setAuthData(login, password);

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

			service.resetAuthData();
		});

		return promise;
	};

	service.sendTwoFactorAuth = function (TFAcode) {
		$http.defaults.headers.common['X-GitHub-OTP'] = TFAcode;

		var promise = service.resource.getProfile().$promise;

		promise.then(function (response) {
			__accountData = response;
			__isLogged = true;
			console.log(response);
		}, function (err) {
			console.log(err);
		});

		return promise;
	};

	service.logOut = function () {
		service.resetAuthData();
		__isLogged = false;
		__accountData = null;
	};

	return service;
}