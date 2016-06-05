/**
 * Module for pages layout
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 06.06.16
 */

(function () {

    function config($routeProvider) {
        $routeProvider
            .when('/', {
                controller : 'layoutController as layoutCtrl',
                templateUrl: '../../catality/app/modules/layout/views/defaultTemplate.html'
            })
    }

    angular.module('catality.layout', ['ngRoute', 'ngSanitize', 'ui.bootstrap', 'catality.global'])
        .config(['$routeProvider', config]);

})();