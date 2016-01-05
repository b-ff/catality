/**
 * GitHub Query Limits Directive Controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 05.01.16
 */

(function () {
	angular.module('cato.global').controller('githubQueryLimitsController', ['$rootScope', '$timeout', 'apiService', 'authService', githubQueryLimitsController]);

	function githubQueryLimitsController($rootScope, $timeout, apiService, authService) {
		var thisCtrl = this,
			time = 5000;

		thisCtrl.timeout = null;

		thisCtrl.limits = {
			core  : {
				limit    : authService.isAuthorized() ? 5000 : 60,
				remaining: '?'
			},
			search: {
				limit    : 30,
				remaining: '?'
			},
			rate  : {
				limit    : authService.isAuthorized() ? 5000 : 60,
				remaining: '?'
			}
		};

		thisCtrl.watch = function () {
			if (thisCtrl.timeout) {
				$timeout.cancel(thisCtrl.timeout);
			}

			thisCtrl.timeout = $timeout(thisCtrl.getLimits, time);
		};

		thisCtrl.getLimits = function () {
			apiService.getActions().rateLimit().$promise.then(
				thisCtrl.updateLimits,
				function (err) {
					console.log(err);
				}
			);
		};

		thisCtrl.updateLimits = function (data) {
			thisCtrl.limits.rate = data.rate;
			thisCtrl.limits.core = data.resources.core;
			thisCtrl.limits.search = data.resources.search;

			$rootScope.$emit('limits.updated', thisCtrl.limits);

			thisCtrl.watch();
		};

		$rootScope.$on('api.response', thisCtrl.watch);

		thisCtrl.watch();
	}

})();
