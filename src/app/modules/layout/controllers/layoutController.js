/**
 * Main layout controller
 *
 * @author slava <networmx128bit@gmail.com>
 * @version 0.0.1
 * 06.06.16
 */

(function() {
    angular.module('catality.layout').controller('layoutController', ['$location', 'markdownService', layoutController]);

    function layoutController($location, markdownService) {
        var thisCtrl = this;

        thisCtrl.markdown = '';
        thisCtrl.title = '';
        thisCtrl.body = '';
        thisCtrl.html = '';

        // If we're at the main page
        if ($location.path() == '' || $location.path() == '/') {
            $location.path('/README.md');
        }

        markdownService.loadMarkdown($location.path()).then(markdownLoadSuccess, markdownLoadFailed);

        /**
         * Callback for success loading of markdown file content
         * @param {String} response - markdown content
         */
        function markdownLoadSuccess(response) {
            thisCtrl.title = markdownService.getHeader(response.data);
            thisCtrl.body = markdownService.toHtml(markdownService.getBody(response.data));
            thisCtrl.markdown = response.data;
        }

        /**
         * Callback for failed loading of markdown file content
         * @param {Object} response - http response object
         */
        function markdownLoadFailed(response) {
            if (response.status == 404) {
                $location.url('/404/?title=' + response.data);
            }
        }
    }
})();