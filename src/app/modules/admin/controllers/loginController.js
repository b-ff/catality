/**
 * Login form controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 15.11.15
 */

angular.module('cato.admin').controller('loginController', ['$uibModal', loginController]);

function loginController($uibModal) {
	var thisCtrl = this;

	thisCtrl.login = '';
	thisCtrl.password = '';

	thisCtrl.token = '';

	thisCtrl.remember = false;

	thisCtrl.isLPAuth = true;
	thisCtrl.isTokenAuth = false;

	thisCtrl.authMethod = authMethod;
	thisCtrl.auth = auth;
	thisCtrl.twoFactorAuth = twoFactorAuth;

	function authMethod() {
		var thisCtrl = this;

		return (thisCtrl.isLPAuth && !thisCtrl.isTokenAuth) ? 'lp' : 'token';
	}

	function auth() {
		console.log('Auth!');
	}

	function twoFactorAuth() {
		var modalInstance = $uibModal.open({
			animation   : true,
			templateUrl : '../../app/modules/admin/views/twoFactorAuthForm.html',
			controller  : 'twoFactorController',
			controllerAs: 'tfCtrl',
			size        : 'md'
		});

		modalInstance.result.then(function (result) {
			console.log('2Factor Auth Submit!', result);
		}, function (result) {
			console.log('2Factor Auth Canceled!', result);
		});
	}
}


