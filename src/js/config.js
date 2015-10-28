/**
 * Application configuration
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15
 */

(function () {

	function config($routeProvider) {
		$routeProvider

			//.when('/', {
			//    controller: 'clientController as clientCtrl',
			//    templateUrl: '/src/views/main.html'
			//})

			.otherwise({
				redirectTo: '/admin/'
			});
	}

	angular.module('cato').config(['$routeProvider', config]);

})();
