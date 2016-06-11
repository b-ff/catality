/**
 * Service for converting Markdown to HTML
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 05.06.16
 */

angular.module('catality.global').factory('markdownService', ['$http', markdownService]);

function markdownService($http) {
	var service = {},
		converter = new showdown.Converter();

	// Enabling automatic generation links from domain names
	converter.setOption('simplifiedAutoLink', true);

	/**
	 * Convert markdown to HTML
	 * @param {String} md - Markdown text
	 */
	service.toHtml = function(md) {
		return converter.makeHtml(md);
	};

	/**
	 * Returns all available headers from Markdown text
	 * @param {String} md - Markdown text
	 * @param {Number} level - Level of header where 1 equals H1 and etc.
	 */
	service.getHeader = function(md, level) {
		var regexp = new RegExp('#{' + (level || 1) + '}\s?([^\n]*)');
			match = md.match(regexp);
		return match ? match[1].trim() : '';
	};

	/**
	 * Return body of the document without top-level header
	 * @param md - Markdown text
	 */
	service.getBody = function(md) {
		return md.replace(/#\s?[^\n]*\n/, '');
	};

	/**
	 * Gets content of markdown file placed on specified url
	 * @param mdUrl - url to markdown file
	 * @returns {Object} Promise
	 */
	service.loadMarkdown = function(mdUrl) {
		if (!mdUrl.match(/^.*\.md$/i)) {
			throw new Error('Received URL doesn\'t look like a path to markdown file');
		}

		return $http.get(mdUrl);
	};

	return service;
}