//Project service used for projects REST endpoint
angular.module('mean').factory("suggestions", ['$resource',
    function($resource) {
        var _this = this;
        _this.suggestionService = $resource('/404/suggestions');

        var find = function(url, routes, callback) {
            _this.suggestionService.get({
                routes: routes,
                url:url,
            }, function(suggestions) {  
                callback(suggestions);
            }, function(err) {
                callback(null);
            });
        };

        return {
            find: find
        };
    }
]);
