'use strict';

var DigitalLibrary = angular.module('DigitalLibrary', []);

DigitalLibrary.factory('data', [function () {
	
	var data = {};

	return data;
}]);

DigitalLibrary.factory('searchService', [function () {
	
	var searchData = {};

	return 
}])

/*angular.module('App', ['App.services', 'App.controllers'])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
        	.when('/', {
				controller: 'LoginCtrl',
				templateUrl: 'templates/login.html'
			})
			.when('/library', {
				controller: 'LibraryCtrl',
				templateUrl: 'templates/library.html'
			})
			.otherwise({
				redirectTo: '/'
			});
    }]);*/