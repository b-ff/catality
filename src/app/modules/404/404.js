/**
 * 404 module
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 06.01.16
 */

(function() {
	angular.module('cato.404', ['ngRoute', 'cato.global'])
		.config(['$routeProvider', config]);

	function config($routeProvider) {
		$routeProvider
			.when('/404/', {
				templateUrl:'/app/modules/404/views/404.html'
			})
			.otherwise({
				redirectTo: '/404/'
			});
	}
})();

