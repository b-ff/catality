/**
 * Service for checking links by url
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 11.06.16
 */

angular.module('catality.global').factory('linkService', ['$location', linkService]);

function linkService($location) {
	var service = {};

	/**
	 * Check if link is a local
	 * @param {String} url - link's URL
	 * @returns {boolean}
	 */
	service.isLocalLink = function(url) {
		var fullLocation = $location.protocol() + '://' + $location.host();

		// If URL is empty (for example in tabs)
		if (url == '') {
			return true;
		}

		// If URL is hash or anchor
		if (url.match(/^\#.*$/) != null) {
			return true;
		}

		return url.match(new RegExp('^'+fullLocation+'.*$')) != null;
	};

	/**
	 * Check if link is external
	 * @param {String} url - link's URL
	 * @returns {boolean}
	 */
	service.isExternalLink = function(url) {
		return !service.isLocalLink(url);
	};

	service.getLocalPathFromLink = function(url) {
		var fullLocation = $location.protocol() + '://' + $location.host(),
			regexp = new RegExp(fullLocation + '(:'+$location.port()+')?');

		if (!service.isLocalLink(url)) {
			return '';
		}

		return url.replace(regexp, '');
	};

	return service;
}
