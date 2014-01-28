'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global','$route', function ($scope, Global, $route) {
    console.log($route);
    $scope.global = Global;
}]);