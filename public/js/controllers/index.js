'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', 'Global', '$route', 'suggestions',
	function($scope, Global, $route, suggestions) {

		var hash = window.location.hash;
		hash = hash.replace('#!', '');		
		var routes = {};

		for (var index in $route.routes) {
			if ($route.routes[index] && $route.routes[index].originalPath && $route.routes[index].originalPath != '') {
				var path = $route.routes[index].originalPath;
				var components = path.split('/');
				components.shift();
				routes[path] = {
					components: components
				};
			}
		}
		suggestions.find(hash, routes, function(suggestions) {
			$scope.suggestions = suggestions;
		});


		$scope.routes = routes;
		$scope.global = Global;
	}
]);