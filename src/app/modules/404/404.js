/**
 * 404 module
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 06.01.16
 */

(function() {
	function config($routeProvider) {
		$routeProvider
			.when('/404/', {
				controller: 'notFoundController as nfCtrl',
				templateUrl:'/app/modules/404/views/404.html'
			})
	}

	angular
		.module('catality.404', ['ngRoute', 'catality.global'])
		.config(['$routeProvider', config]);
})();

