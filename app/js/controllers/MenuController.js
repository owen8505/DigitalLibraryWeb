'use strict';

DigitalLibrary.controller('MenuController', 
	function MenuController($scope, $location, $anchorScroll, MenuService, SearchService){

		$scope.menuLoading = true;
		$scope.LAST_VIEWED_SELECTED = '#LastViewed';
		$scope.selected = $scope.LAST_VIEWED_SELECTED;
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

		$scope.changeSelectedItem = function(departmentId){		
			$($scope.selected).removeClass('selected');
			$scope.selected = departmentId;	
			var optionSelected = ($($scope.selected));		

			optionSelected.addClass('selected');
			$('#left-arrow').css('top', optionSelected.offset().top)
			
		}

		$scope.searchDocumentFolder = function(departmentId, departmentName, siteURL){										
			SearchService.getDocumentFolder(departmentName, siteURL);
			$location.hash('top');
			$anchorScroll();		
			$scope.changeSelectedItem(('#functionalArea'+departmentId));	
		};

		$scope.getLastViewed = function(){
			SearchService.getLastViewed();
			$location.hash('top');
			$anchorScroll();
			$scope.changeSelectedItem($scope.LAST_VIEWED_SELECTED);
		};
	}
);