/**
 * Authentication service
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15
 */

angular.module('cato.admin').factory('authService', ['$resource', 'base64Service', authService]);

function authService($resource, base64Service) {
    var service = {};

    service.resource = $resource('https://api.github.com', {}, {
        'authenticate': { method: 'GET'}
    });

    service.isAuthorized = function() {
        return typeof window.localStorage.authData != "undefined";
    };

    service.logIn = function() {
        window.localStorage.authData = {
            login: '',
            password: ''
        }
    };

    service.logOut = function() {
        delete window.localStorage.authData;
    };

    return service;
}