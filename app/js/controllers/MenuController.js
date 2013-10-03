'use strict';

DigitalLibrary.controller('MenuController', 
	function MenuController($scope, $location, $anchorScroll, MenuService, SearchService){

		$scope.menuLoading = true;
		MenuService.getMenu();

		$scope.getMenu = function(){
			$scope.menuLoading = true;
			$scope.error = false;
			MenuService.getMenu();
		};

		$scope.$on('handleMenuChange', function(){
			$scope.menu = MenuService.menu;
			$scope.menuLoading = MenuService.menuLoading;
			$scope.error = MenuService.error;
		});

		$scope.$on('handleMenuError', function(){
			$scope.menuLoading = MenuService.menuLoading;
			$scope.error = MenuService.error;
		});

		$scope.searchDocumentFolder = function(departmentName, siteURL){								
			SearchService.getDocumentFolder(departmentName, siteURL);
			$location.hash('top');
			$anchorScroll();
		};

		$scope.getLastViewed = function(){
			SearchService.getLastViewed();
			$location.hash('top');
			$anchorScroll();
		};
	}
);