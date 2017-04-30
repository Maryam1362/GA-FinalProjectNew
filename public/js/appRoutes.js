
var app = angular.module('SampleApp',['ngRoute']);
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/add', {
			templateUrl: 'views/add.html',
			controller: 'AddController'
		})

		.when('/search', {
			templateUrl: 'views/search.html',
			controller: 'SearchController'	
		});
		
	$locationProvider.html5Mode(true);

}]);