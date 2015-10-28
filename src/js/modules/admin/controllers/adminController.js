/**
 * Main administrative controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15
 */

angular.module('cato.admin').controller('adminController', ['$location', 'authService', adminController]);

function adminController($location, authService) {
	var thisCtrl = this;

	thisCtrl.login = '';
	thisCtrl.password = '';

	console.log($location.path());

	if (!authService.isAuthorized() && $location.path() != '/admin/login') {
		$location.path('/admin/login');
	}
}