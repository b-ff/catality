/**
 * App configuration service
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 27.11.15
 */

angular.module('cato.global').factory('configService', [configService]);

function configService() {
	var service = {};

	service.ready = function () {
		return false;
	};

	return service;
}
