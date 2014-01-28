'use strict';

//Setting up route
angular.module('mean').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/404', {
            templateUrl: 'mean-404/views/index.html'

        }).otherwise({
         	templateUrl: 'mean-404/views/index.html'   
        });       
    }
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);