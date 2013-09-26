'use strict';

var DigitalLibrary = angular.module('DigitalLibrary', ['ngResource','ngCookies'])

.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);