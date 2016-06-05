/**
 * Main administrative controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15
 */

angular.module('catality.admin').controller('adminController', ['$location', 'authService', 'configService', adminController]);

function adminController($location, authService, configService) {
	var thisCtrl = this;

	if (!authService.isAuthorized()) {
		$location.path('/admin/login');
	}
	//
	//if (!configService.ready()) {
	//	$location.path('/admin/setup');
	//}
}