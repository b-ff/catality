/**
 * Two-Factor Authentication modal controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 15.11.15
 */

angular.module('cato.admin').controller('twoFactorController', ['$uibModalInstance', 'authService', twoFactorController]);

function twoFactorController($uibModalInstance, authService) {
	var thisCtrl = this;

	thisCtrl.code = '';

	thisCtrl.send = send;
	thisCtrl.cancel = cancel;

	thisCtrl.errors = [];

	thisCtrl.setError = setError;
	thisCtrl.resetErrors = resetErrors;

	function send() {
		authService.sendTwoFactorAuth(thisCtrl.code).then(function (response) {
			$uibModalInstance.close(thisCtrl.code);
		}, function (err) {
			thisCtrl.setError(err.data);
		});
	}

	function cancel() {
		authService.resetAuthData();
		$uibModalInstance.dismiss('canceled');
	}

	function setError(err) {
		thisCtrl.errors.push(err);
	}

	function resetErrors() {
		thisCtrl.errors = [];
	}
}


