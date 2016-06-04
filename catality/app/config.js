/**
 * Application configuration
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 08.10.15
 */

(function () {

	function config() {
		//...
	}

	function run(gettextCatalog) {
		if (window.navigator.language) {
			var lang = window.navigator.language;
			gettextCatalog.setCurrentLanguage('ru');
			gettextCatalog.loadRemote('/app/translations/' + lang + '.json');
		}
	}

	angular.module('cato').config(['$routeProvider', config]);
	angular.module('cato').run(['gettextCatalog', run]);

})();
