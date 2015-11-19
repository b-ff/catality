/**
 * Login form controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 15.11.15
 */

angular.module('cato.admin').controller('loginController', ['$location', '$uibModal', 'authService', loginController]);

function loginController($location, $uibModal, authService) {
	var thisCtrl = this;

	thisCtrl.login = '';
	thisCtrl.password = '';

	thisCtrl.token = '';

	thisCtrl.remember = false;

	thisCtrl.isLPAuth = true;
	thisCtrl.isTokenAuth = false;

	thisCtrl.passFieldType = 'password';

	thisCtrl.errors = [];

	thisCtrl.setError = setError;
	thisCtrl.resetErrors = resetErrors;

	thisCtrl.authMethod = authMethod;
	thisCtrl.auth = auth;
	thisCtrl.twoFactorAuth = twoFactorAuth;
	thisCtrl.togglePassField = togglePassField;
	thisCtrl.authCheck = authCheck;

	function setError(err) {
		thisCtrl.errors.push(err);
	}

	function resetErrors() {
		thisCtrl.errors = [];
	}

	function authCheck() {
		if (authService.isAuthorized()) {
			$location.path('/admin/');
		}
	}

	function togglePassField() {
		thisCtrl.passFieldType = (thisCtrl.passFieldType == 'password') ? 'text' : 'password';
	}

	function authMethod() {
		return (thisCtrl.isLPAuth && !thisCtrl.isTokenAuth) ? 'lp' : 'token';
	}

	function auth() {
		thisCtrl.resetErrors();

		authService
			.auth(thisCtrl.login, thisCtrl.password)
			.then(function () {
				thisCtrl.authCheck();
			}, function (err) {
				if (authService.isTwoFactorRequired()) {
					thisCtrl.twoFactorAuth();
					return;
				}

				thisCtrl.setError(err.data);
				console.log(err);
			});
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
			thisCtrl.authCheck();
			console.log('2Factor Auth Submit!', result);
		}, function (result) {
			console.log('2Factor Auth Canceled!', result);
		});
	}
}


