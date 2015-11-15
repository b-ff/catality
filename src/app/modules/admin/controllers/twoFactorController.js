/**
 * Two-Factor Authentication modal controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 15.11.15
 */

angular.module('cato.admin').controller('twoFactorController', ['$uibModalInstance', twoFactorController]);

function twoFactorController($uibModalInstance) {
	var thisCtrl = this;

	thisCtrl.code = '';

	thisCtrl.send = send;
	thisCtrl.cancel = cancel;

	function send() {
		$uibModalInstance.close(thisCtrl.code);
	}

	function cancel() {
		$uibModalInstance.dismiss('canceled');
	}
}


