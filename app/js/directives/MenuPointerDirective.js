'use strict';

DigitalLibrary.directive('MenuPointerDirective', function ($scope, SearchService) {

	var menuPointer = {};

	menuPointer.top = ui.position.top;

	menuPointer.setTopPosition = function(topPosition){
		console.log(this.top + " " + topPosition);
	}

	$scope.$on('handleDataChange', function(){
		console.log("Acá también entré");
	});

	return menuPointer;
});