'use strict';

DigitalLibrary.controller('MenuController', 
	function MenuController($scope){

		$scope.menu = [
			{"id":"1", "name": "Front Office", "functionalArea": [
				{"id":"1", "name": "Executive Management"}]
			},
			{"id":"2", "name": "Policy Group", "functionalArea": [
				{"id":"2", "name": "Policy"}
			]},
			{"id":"3", "name": "Program Office", "functionalArea": [
				{"id":"3", "name": "Project Management"}
			]},
			{"id":"4", "name": "Management", "functionalArea": [
				{"id":"4", "name": "Office Administration"},
				{"id":"5", "name": "Human Resources"},
				{"id":"6", "name": "Procurement"},
				{"id":"7", "name": "Finances"},
				{"id":"8", "name": "Logistics"},
				{"id":"9", "name": "IT Support"},
				{"id":"10", "name": "COR"},
				{"id":"11", "name": "Grants"}
			]}
		]

		$scope.searchDocumentFolder = function(departmentID, departmentName){
			$scope.subtitle = departmentName;
			
		}
	}
);