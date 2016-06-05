/**
 * Main application file
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15.
 */

angular.module('catality', [

	// angular components

	'ngRoute',
	'ngResource',
	'ui.bootstrap',
	'gettext',

	// modules

	'catality.global',
	'catality.layout',
	'catality.admin',
	'catality.404'
]);