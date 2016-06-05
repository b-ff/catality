/**
 * Initial setup Controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 27.11.15
 */

angular.module('catality.admin').controller('setupController', ['$location', 'configService', setupController]);

function setupController($location, configService) {
	if (configService.ready()) {
		$location.path('/admin/');
	}
}