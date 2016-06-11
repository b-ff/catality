/**
 * Directive for handling click event on every link and vary it behavior depending on URL relation (local or external)
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 07.06.16
 */

angular.module('catality.global')
	.directive('linkHandler', ['$window', 'linkService', linkHandler]);

function linkHandler($window, linkService) {
	return {
		restrict: 'A',
		link: function (scope, element) {
			element.on('click', function(e) {
				if (e.target.tagName == 'A') {
					if (linkService.isLocalLink(e.target.href) && e.target.className != 'ng-binding') {
						e.preventDefault();
						$window.location.hash = linkService.getLocalPathFromLink(e.target.href);
					}
				}
			});
		}
	}
}
