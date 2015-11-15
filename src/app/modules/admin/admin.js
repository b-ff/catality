/**
 * Admin module configuration
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15
 */

(function () {

	function config($routeProvider) {
		$routeProvider
			.when('/admin/', {
				controller : 'adminController as adminCtrl',
				templateUrl: '../../app/modules/admin/views/main.html'
			})
			.when('/admin/login', {
				controller : 'loginController as loginCtrl',
				templateUrl: '../../app/modules/admin/views/login.html'
			})
	}

	angular.module('cato.admin', ['ngRoute', 'cato.global'])
		.config(['$routeProvider', config]);

})();
