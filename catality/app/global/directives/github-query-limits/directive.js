/**
 * GitHub Query Limits Directive
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 05.01.16
 */

angular.module('cato.global').directive('githubQueryLimits', function ($rootScope, apiService) {
	return {
		restrict   : 'E',
		templateUrl: '/app/global/directives/github-query-limits/template.html',
		controller : 'githubQueryLimitsController as directiveCtrl'
	}
});
