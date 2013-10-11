'use strict';

var DigitalLibrary = angular.module('DigitalLibrary', ['ngResource','ngCookies'])

.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common["X-Requested-With"]
}])

.run(function(){
	var winHeigth = $(window).height();
	$('#navigation').css('min-height',winHeigth);
	$('#navigation').css('height',winHeigth);
})

.constant('CONFIG', {
	PRIMARY_SITE_URL: 'http://samepage.mexusbio.org/sites/DigitalLibrary/',
	SERVICE_DOCUMENT_FOLDER_URL: 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Libraries?w=:w',
	SERVICE_DOCUMENT_URL: 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Documents?w=:w&l=:l&b=:b&i=:i',
	DOCUMENT_BATCH: 20,
	MENU_SERVICE_URL: 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Menu',
	SERVICE_SEARCH_DOCUMENT_URL: 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Menu',
	SERVICE_FILTERS: 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Filters',
	SERVICE_FILTER_DOCUMENTS: 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Search?p=:p&b=:b&i=:i',
});
