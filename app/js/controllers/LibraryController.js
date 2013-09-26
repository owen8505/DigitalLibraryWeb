'use strict';

DigitalLibrary.controller('LibraryController',
	
	function LibraryController($scope, SearchService){
		
		$scope.elements = {};
		$scope.view = "large-3";
		$scope.departmentName = "";

		$scope.dataLoading = false;
		$scope.noElements = true;		
		$scope.firstLoad = false;

		$scope.titleVisibility = false;
		//$scope.folderSectionVisibility = false;
		//$scope.documentSectionVisibility = false;
		$scope.toolsVisibility = false;
		$scope.sectionVisibility = false;

		$scope.setVisibility = function(){
			//console.log("Hay elementos:" + $scope.noElements + " Esta cargando:" + $scope.dataLoading  + " Es la primera vez:" + $scope.firstLoad);			
			
			//Mostrar si hay elementos y no está cargando o si hay elementos y no es la primera vez
			if((!$scope.noElements && !$scope.dataLoading) || (!$scope.noElements && !$scope.firstLoad)){
				//console.log("mostrar");
				$scope.toolsVisibility = true;
			}else{
				//console.log("ocultar");
				$scope.toolsVisibility = false;
			}


		};

		$scope.setVisibility();
		SearchService.getLastViewed();			

		$scope.showInformation = function($event){
			$event.cancelBubble = true;
		}

		$scope.sendMail = function(documentName, mail, $event){
			$event.cancelBubble = true;
			window.open('mailto:?subject=Document%20Shared&body=I%20would%20like%20to%20share%20this%20document%20with%20you%20' + documentName + ',%20please,%20click%20in%20the%20next%20link%20in%20order%20to%20download%20it%20' + mail);
		}

		$scope.openDocument = function(document){
			window.open(document.url);			
			SearchService.setLastViewed(document);

		};

		$scope.searchDocuments = function(libraryID, libraryName, departmentName, siteURL, lastID, totalDisplayedItems){			
			SearchService.getDocuments(libraryID, libraryName, departmentName, siteURL, lastID, totalDisplayedItems);			
		};

		$scope.switchView = function(view){
			if(view== "group"){
				$scope.view = "large-3";
			}else{
				$scope.view = "large-12";
			}
		};

		$scope.$on('handleDataStatus', function(){
			$scope.error = SearchService.error;
			$scope.firstLoad = SearchService.firstLoad;
			$scope.dataLoading = SearchService.dataLoading;	

			$scope.setVisibility();
		});

		$scope.$on('handleDataChange', function(totalDisplayedItems){							
			$scope.firstLoad = SearchService.firstLoad;
			$scope.noElements = SearchService.noElements;
			$scope.lastFolder = SearchService.lastFolder;
			$scope.totalDisplayedItems = SearchService.totalDisplayedItems;
			$scope.dataLoading = SearchService.dataLoading;
			$scope.error = SearchService.error;

			$scope.setVisibility();

			if($scope.firstLoad){							
				$scope.subtitle = SearchService.subtitle;
				$scope.typeDocument = SearchService.typeDocument;							
				$scope.departmentName = SearchService.departmentName;				
				$scope.totalItems = SearchService.totalItems;
				$scope.lastFolder = SearchService.lastFolder;	
				$scope.elements = SearchService.elements;
			}else{
				$scope.elements = $scope.elements.concat(SearchService.elements);
			}			
		});

	}	

);