DigitalLibrary.factory('SearchService', function ($rootScope, $resource, $cookieStore, $q, CONFIG) {


	var data = {};
	data.elements = {};
	data.subtitle = "";
	data.typeDocument = "document";
	data.dataLoading = true;
	data.noElements = false;
	data.error = false;
	data.departmentName = "";
	data.totalDisplayedItems = 0;
	data.firstLoad = true;
	data.lastFolder = {};
	data.searching = false;

	data.getDocumentsByFilters = function(params, lastID, totalDisplayedItems){
		
		if(totalDisplayedItems == 0){
			data.totalDisplayedItems = 0;
			data.firstLoad = true;			
		}else{
			data.totalDisplayedItems = totalDisplayedItems;
			data.firstLoad = false;			
		}
		
		data.dataLoading = true;		
		data.broadcastDataStatus();
		
		var deferred = $q.defer();
		var FilterDocumentServicePromise = deferred.promise;
		var FilterDocumentService = $resource(CONFIG.SERVICE_FILTER_DOCUMENTS,{})
		.get({p:params,b:CONFIG.DOCUMENT_BATCH,i:lastID},

			success = function(event){					
				deferred.resolve(event);				
			},

			error = function(respose){
				error = true;
				console.log("Error retreving the data");
			}

		);

		FilterDocumentServicePromise.then(
			resolve = function(event){						
				data.subtitle = 'Search Results';
				data.elements = event.SearchDocumentsResult.items;
				data.totalItems = event.SearchDocumentsResult.totalItems;

				if(data.totalItems < CONFIG.DOCUMENT_BATCH){
					data.totalDisplayedItems = data.totalItems;
				}else{
					data.totalDisplayedItems = data.totalDisplayedItems + CONFIG.DOCUMENT_BATCH;
				}

				data.typeDocument = "document";
				data.searching = true;
				data.dataLoading = false;
				data.lastFolder = {'lastID':event.SearchDocumentsResult.lastID, 'totalDisplayedItems':data.totalDisplayedItems};
				data.breadCrumbFolder = [{'departmentName':'Search Result', 'siteURL':''}];

				if(data.totalItems != 0){
					data.noElements = false;
				}else{
					data.noElements = true;
				}

				data.broadcastItems();
			},

			reject = function(response){
				data.error = true;
				console.log(response);
			}
		);
	}

	data.getDocuments = function(libraryID, libraryName, libraryURL, departmentName, siteURL, lastID, totalDisplayedItems){

		if(totalDisplayedItems == 0){
			data.totalDisplayedItems = 0;
			data.firstLoad = true;			
		}else{
			data.totalDisplayedItems = totalDisplayedItems;
			data.firstLoad = false;			
		}

		data.dataLoading = true;		
		data.broadcastDataStatus();

		var deferred = $q.defer();
		var DocumentServicePromise = deferred.promise;
		var DocumentService = $resource(CONFIG.SERVICE_DOCUMENT_URL,{})
		.get({w:siteURL,l:libraryID,b:CONFIG.DOCUMENT_BATCH,i:lastID},

			success = function(event){	
				deferred.resolve(event);
			},

			error = function(respose){
				error = true;
				console.log("Error retreving the data");
			}
		);

		DocumentServicePromise.then(

			resolve = function(event){						
				data.subtitle = libraryName;
				data.elements = event.GetDocumentsResult.items;
				data.totalItems = event.GetDocumentsResult.totalItems;

				if(data.totalItems < CONFIG.DOCUMENT_BATCH){
					data.totalDisplayedItems = data.totalItems;
				}else{
					data.totalDisplayedItems = data.totalDisplayedItems + CONFIG.DOCUMENT_BATCH;
				}

				data.typeDocument = "document";
				data.searching = false;
				data.dataLoading = false;
				data.departmentName = departmentName;
				data.breadCrumbFolder = [{'departmentName':libraryName, 'siteURL':libraryURL},{'departmentName':departmentName, 'siteURL':siteURL}];				

				if(data.totalItems != 0){
					data.noElements = false;
				}else{
					data.noElements = true;
				}
				//console.log(event.GetDocumentsResult);
				data.lastFolder = {'libraryID':libraryID, 'libraryName':libraryName, 'departmentName':departmentName, 'siteURL':siteURL, 'lastID':event.GetDocumentsResult.lastID, 'totalDisplayedItems':data.totalDisplayedItems};
				data.broadcastItems();
			},

			reject = function(response){
				data.error = true;
				console.log(response);
			}
		);
	};

	data.getDocumentFolder = function(departmentName, siteURL){

		data.dataLoading = true;
		data.broadcastDataStatus();
		data.libraryURL = siteURL;

		data.firstLoad = true;

		var deferred = $q.defer();
		var DocumentFolderServicePromise = deferred.promise;
		var DocumentFolderService = $resource(CONFIG.SERVICE_DOCUMENT_FOLDER_URL,{})
		.get({w:siteURL},

			success = function(event){
				deferred.resolve(event);
			},

			error = function(response){
				deferred.reject(response);				
				console.log("Error retreving the data");
			}

		);

		DocumentFolderServicePromise.then(

			resolve = function(event){
				data.subtitle = departmentName;
				data.elements = event.GetListsResult;
				data.totalItems = data.elements.length;
				data.typeDocument = "folder";
				data.dataLoading = false;
				data.searching = false;
				data.departmentName = departmentName;
				data.breadCrumbFolder = [{'departmentName':departmentName, 'siteURL':siteURL}];
				data.totalDisplayedItems = data.totalItems;

				if(data.totalItems != 0){
					data.noElements = false;
				}else{
					data.noElements = true;
				}
				//console.log("Hay elementos después de cargar: " + data.noElements);
				data.broadcastItems();

			},
			reject = function(response){
				data.error = true;
				console.log(response);
			}
		);

	};

	data.getLastViewed = function(){		
		var deferred = $q.defer();
		var LastViewedServicePromise = deferred.promise;

		data.firstLoad = true;

		success = function(){
			deferred.resolve(event);
		};

		error = function(reponse){
			data.error = false;
			deferred.reject(response);
		};

		success();

		LastViewedServicePromise.then(

			resolve = function(){
				var elements = $cookieStore.get('lastViewedCookie');
				data.subtitle = 'Last Viewed';				
				data.typeDocument = "document";
				data.dataLoading = false;
				data.searching = false;
				data.error = false;
				data.breadCrumbFolder = [{'departmentName':'Last Viewed', 'siteURL':''}];

				if(typeof elements == 'undefined'){					
					data.elements = {};
					data.totalItems = 0;
					data.totalDisplayedItems = 0;
					data.noElements = true;
				}else if(elements.length == 0){					
					data.elements = {};
					data.totalItems = 0;
					data.totalDisplayedItems = 0;
					data.noElements = true;
				}else{
					data.elements = elements.reverse();
					data.totalItems = data.elements.length;
					data.totalDisplayedItems = data.totalItems;
					data.noElements = false;				
				}

				data.broadcastItems();
			},

			reject = function(){
				data.error = true;
				console.log("Error retreving the data");
			}
		);
		
	};

	data.setLastViewed = function(document){
		var elements = $cookieStore.get('lastViewedCookie');		
		if(typeof elements == 'undefined'){			
			elements = [];
			elements.push(document);
			$cookieStore.put('lastViewedCookie', elements);
		}else{			
			if(elements.length < 5 && !(data.isContained(elements,document))){
				elements.push(document);				
				$cookieStore.put('lastViewedCookie', elements);					
			}else if(data.isContained(elements,document)){
				elements.shift();
				elements.push(document);
				$cookieStore.put('lastViewedCookie', elements);
			}
		}
	};

	data.isContained = function(list,element){
		var contained = false;
		for(var index=0; index<list.length; index++){
			if(list[index].name == element.name){				
				contained = true;
				break;
			}
		}
		return contained;
	};

	data.broadcastItems = function(){
		$rootScope.$broadcast('handleDataChange');
	};

	data.broadcastDataStatus = function(){
		$rootScope.$broadcast('handleDataStatus');
	};

	//Return statement
	return data;

});