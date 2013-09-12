'use strict';

DigitalLibrary.controller('LibraryController',
	
	function MenuController($scope){

		$scope.subtitle = "Last Reviewed";
		$scope.elements = {
			id: 0,
			items: [
				{id:"1",name:"6.1-INL2013-138-13502.pdf",type:"document",creationDate:"08/23/2013",modified:"08/23/2013", modifiedBy:"López, Erik", projectCode:"IN41MX70", acquisitionID:"284", referenceID:"",pr:"SMX53012F0008",po:"SMX53012F0008",agency:"",recipient:"SSP",subrecipient:"SSP - PF",country:"",projectCoordinator:"",url:"sites/DigitalLibrary/PP/Logistics/FEP"},
				{id:"2",name:"6.1-INL2013-138-15284.pdf",type:"document",creationDate:"08/23/2013",modified:"08/23/2013", modifiedBy:"López, Erik", projectCode:"IN41MX70", acquisitionID:"284", referenceID:"",pr:"SMX53012F0008",po:"SMX53012F0008",agency:"",recipient:"SSP",subrecipient:"SSP - PF",country:"",projectCoordinator:"",url:"sites/DigitalLibrary/PP/Logistics/FEP"},
				{id:"3",name:"6.1-NAS2013-138-7415.pdf",type:"document",creationDate:"08/23/2013",modified:"08/23/2013", modifiedBy:"López, Erik", projectCode:"IN41MX70", acquisitionID:"284", referenceID:"",pr:"SMX53012F0008",po:"SMX53012F0008",agency:"",recipient:"SSP",subrecipient:"SSP - PF",country:"",projectCoordinator:"",url:"sites/DigitalLibrary/PP/Logistics/FEP"},
				{id:"4",name:"6.1-NAS2012-138-330.pdf",type:"document",creationDate:"08/23/2013",modified:"08/23/2013", modifiedBy:"López, Erik", projectCode:"IN41MX70", acquisitionID:"284", referenceID:"",pr:"SMX53012F0008",po:"SMX53012F0008",agency:"",recipient:"SSP",subrecipient:"SSP - PF",country:"",projectCoordinator:"",url:"sites/DigitalLibrary/PP/Logistics/FEP"},
				{id:"5",name:"6.2-NAS2013-138-8493.pdf",type:"document",creationDate:"08/23/2013",modified:"08/23/2013", modifiedBy:"López, Erik", projectCode:"IN41MX70", acquisitionID:"284", referenceID:"",pr:"SMX53012F0008",po:"SMX53012F0008",agency:"",recipient:"SSP",subrecipient:"SSP - PF",country:"",projectCoordinator:"",url:"sites/DigitalLibrary/PP/Logistics/FEP"},
				{id:"6",name:"6.1-NAS2012-138-5932.pdf",type:"document",creationDate:"08/23/2013",modified:"08/23/2013", modifiedBy:"López, Erik", projectCode:"IN41MX70", acquisitionID:"284", referenceID:"",pr:"SMX53012F0008",po:"SMX53012F0008",agency:"",recipient:"SSP",subrecipient:"SSP - PF",country:"",projectCoordinator:"",url:"sites/DigitalLibrary/PP/Logistics/FEP"}
			],
			lastID:6,
			totalItems:6,
		};
		
		$scope.searchDocumentFolder = function(departmentID, departmentName){
			$scope.subtitle = departmentName;
			console.log("message");
			
		}		
	}

);