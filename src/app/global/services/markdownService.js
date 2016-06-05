/**
 * Service for converting Markdown to HTML
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 05.06.16
 */

angular.module('catality.global').factory('markdownService', markdownService);

function markdownService() {
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

	return service;
}