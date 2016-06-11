/**
 * Controller for "Not Found" page
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 06.06.16
 */

(function() {
    angular.module('catality.404').controller('notFoundController', ['$location', notFoundController]);

    function notFoundController($location) {
        var thisCtrl = this;

        thisCtrl.header = false;

        if ($location.search().hasOwnProperty('title')) {
            thisCtrl.header = $location.search().title;
        }
    }
})();
