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

        thisCtrl.path = $location.path();

        thisCtrl.title = '';
        thisCtrl.markdown = '';
        thisCtrl.html = '';

        // If we at the main page
        if (thisCtrl.path == '/') {
            thisCtrl.path = '/README.md';
        }

        markdownService.loadMarkdown(thisCtrl.path).then(markdownLoadSuccess, markdownLoadFailed);

        function markdownLoadSuccess(response) {
            thisCtrl.title = markdownService.getHeader(response.data);
            thisCtrl.body = markdownService.toHtml(markdownService.getBody(response.data));
            thisCtrl.markdown = response.data;
        }

        function markdownLoadFailed(response) {
            if (response.status == 404) {
                $location.url('/404/?title=' + response.data);
            }
        }
    }
})();