'use strict';

DigitalLibrary.controller('LibraryController',
	
	function LibraryController($location, $anchorScroll, $scope, SearchService, FiltersService){
		
		$scope.filters = {};
		FiltersService.getFilters();
		$scope.searching = false;
		$scope.filtersError = false;

		$scope.elements = {};
		$scope.view = "large-3";
		$scope.departmentName = "";
		$scope.libraryURL = "";

		//Visibility variables
		$scope.dataLoading = false;
		$scope.noElements = true;		
		$scope.firstLoad = false;

		$scope.titleVisibility = false;
		$scope.toolsVisibility = false;
		$scope.sectionVisibility = false;
		$scope.noDataAlertVisibility = false;
		$scope.informationSection = false;
		$scope.filtersSection = false;

		$scope.toggleOptions = function(divToHide){
			var checkboxGroup = $('.'+divToHide)[0];
			var button = $('#'+divToHide+'Button')[0];
			$(checkboxGroup).toggle(0, function(){
				if($(button).html() == '-'){
					$(button).html('+');
				}else{
					$(button).html('-');
				}
			});
			
		};


		$scope.searchDocumentsByFilters = function(lastID, totalDisplayedItems){

			var params = '';
			for(var filterIndex=0; filterIndex<$scope.filters.length; filterIndex++){			
				var checkboxGroupName = '';
				var checkboxGroupChecked = null;
				var textboxName = '';
				var textbox = null;
				var textboxValue = '';

				if($scope.filters[filterIndex].type == 'checkbox'){
					checkboxGroupName = $scope.filters[filterIndex].internalName;									
					checkboxGroupChecked = $('input[name='+checkboxGroupName+']:checked');	
					if(checkboxGroupChecked.length > 0){
						for(var optionIndex=0; optionIndex<checkboxGroupChecked.length; optionIndex++){
							if(optionIndex == 0){
								params = params + checkboxGroupName + ':' + checkboxGroupChecked[optionIndex].value;
							}else {
								params = params + ';' + checkboxGroupChecked[optionIndex].value;
							}

							if(params != '' && (optionIndex == (checkboxGroupChecked.length-1))){
								params = params + '!';
							}							
						}
					}	
				}else{
					textboxName = $scope.filters[filterIndex].internalName;
					textbox = $('#'+textboxName)[0];
					
					textboxValue = textbox.value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');;
					if(textboxValue != '' && textboxValue != null){
						params = params + textbox.name + ':' + textboxValue + '!';
					}
				}
			}									
			params = params.substring(0, params.length-1);

			if(params != '' && params != null){
				$scope.filtersError = false;
				SearchService.getDocumentsByFilters(params,lastID,totalDisplayedItems);
			}else{
				$scope.filtersError = true;
				$location.hash('top');
				$anchorScroll();
			}
		};

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

			if($scope.noElements && !$scope.dataLoading){
				$scope.noDataAlertVisibility = true;
			}else{
				$scope.noDataAlertVisibility = false;
			}

		};

		$scope.setVisibility();
		SearchService.getLastViewed();		

		$scope.closeFilters = function(){			
			$scope.filtersSection = false;
			$scope.filtersError = false;				
		}

		$scope.showFilters = function(){
			if($scope.filtersSection){
				$scope.closeFilters();
			}else{
				$scope.filtersSection = true;
				$location.hash('top');
				$anchorScroll();
			}
		}

		$scope.closeInformation = function(){
			$scope.informationSection = false;
			$location.hash('top');
			$anchorScroll();
		}

		$scope.showInformation = function(element, $event){			
			$event.stopPropagation();
			$scope.informationSection = true;
			$scope.dataInformation = element;
			$location.hash('top');
			$anchorScroll();
		}

		$scope.sendMail = function(documentName, documentURL, $event){
			$event.stopPropagation();
			$scope.informationSection = false;

			var mail = ""
			mail = 'mailto:' +
				   '?subject=' + escape('Document Shared') +								   
				   '&body=' + escape('I would like to share this document with you') + documentName + escape('. \n\nPlease, click in the next link in order to download it: ') +  documentURL;

			window.location.href = mail;
		}

		$scope.openDocument = function(document, $event){
			$event.stopPropagation();
			$scope.informationSection = false;
			window.open(document.url);			
			SearchService.setLastViewed(document);		

		};

		$scope.searchDocuments = function(libraryID, libraryName, departmentName, siteURL, lastID, totalDisplayedItems, moreInfo){			
			$scope.informationSection = false;
			SearchService.getDocuments(libraryID, libraryName, $scope.libraryURL, departmentName, siteURL, lastID, totalDisplayedItems);			
			if(!moreInfo){
				$location.hash('top');
				$anchorScroll();
			}
		};

		$scope.switchView = function(view){
			if(view== "group"){
				$scope.view = "large-3";
			}else{
				$scope.view = "large-12";
			}
		};

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

		$scope.$on('handleFiltersData', function(){
			$scope.filters = FiltersService.elements;
		});

		$scope.$on('handleDataStatus', function(){
			$scope.informationSection = false;
			$scope.error = SearchService.error;
			$scope.firstLoad = SearchService.firstLoad;
			$scope.dataLoading = SearchService.dataLoading;

			$scope.setVisibility();
		});

		$scope.$on('handleDataChange', function(totalDisplayedItems){				

			$scope.informationSection = false;						
			$scope.firstLoad = SearchService.firstLoad;
			$scope.noElements = SearchService.noElements;
			$scope.lastFolder = SearchService.lastFolder;
			$scope.totalDisplayedItems = SearchService.totalDisplayedItems;
			$scope.dataLoading = SearchService.dataLoading;
			$scope.error = SearchService.error;
			$scope.libraryURL = SearchService.libraryURL;
			$scope.searching = SearchService.searching;				

			if(SearchService.breadCrumbFolder.length > 0){
				$scope.breadcrumb = SearchService.breadCrumbFolder;
			}

			$scope.setVisibility();
			if($scope.searching){
				$scope.closeFilters();
				$location.hash('top');
				$anchorScroll();
			}else{
				($('#advancedSearch')[0]).reset();
			}

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