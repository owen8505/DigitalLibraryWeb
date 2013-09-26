DigitalLibrary.factory('SearchService', function ($rootScope, $resource, $cookieStore, $q) {

	var SERVICE_DOCUMENT_FOLDER_URL = 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Libraries?w=:w';
	var SERVICE_DOCUMENT_URL = 'http://sap.mexusbio.org/DigitalLibraryServices/SharePointDataAccess.svc/Documents?w=:w&l=:l&b=:b&i=:i';
	var DOCUMENT_BATCH = 20;

	//Response Service Object
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

	data.getDocuments = function(libraryID, libraryName, departmentName, siteURL, lastID, totalDisplayedItems){						

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
		var DocumentService = $resource(SERVICE_DOCUMENT_URL,{})
		.get({w:siteURL,l:libraryID,b:DOCUMENT_BATCH,i:lastID},

			success = function(event){	
				deferred.resolve(event);
			},

			error = function(respose){
				console.log("Error retreving the data");
			}
		);

		DocumentServicePromise.then(

			resolve = function(event){				
				data.subtitle = libraryName;
				data.elements = event.GetDocumentsResult.items;
				data.totalItems = event.GetDocumentsResult.totalItems;

				if(data.totalItems < DOCUMENT_BATCH){
					data.totalDisplayedItems = data.totalItems;
				}else{
					data.totalDisplayedItems = data.totalDisplayedItems + DOCUMENT_BATCH;
				}

				data.typeDocument = "document";
				data.dataLoading = false;
				data.departmentName = departmentName;

				if(data.totalItems != 0){
					data.noElements = false;
				}else{
					data.noElements = true;
				}
				//console.log(event.GetDocumentsResult);
				data.lastFolder = {'libraryID':libraryID, 'libraryName':libraryName, 'departmentName':departmentName, 'siteURL':siteURL, 'lastID':event.GetDocumentsResult.lastID, 'totalDisplayedItems':data.totalDisplayedItems}				
				console.log(data.lastFolder);
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

		data.firstLoad = true;

		var deferred = $q.defer();
		var DocumentFolderServicePromise = deferred.promise;
		var DocumentFolderService = $resource(SERVICE_DOCUMENT_FOLDER_URL,{})
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
				data.departmentName = departmentName;
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
			deferred.reject(response);
		};

		success();

		LastViewedServicePromise.then(

			resolve = function(){
				var elements = $cookieStore.get('lastViewedCookie');
				data.subtitle = 'Last Viewed';				
				data.typeDocument = "document";
				data.dataLoading = false;
				data.error = false;

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
					data.elements = elements;
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
			if(elements.length < 5){
				console.log(data.isContained(elements,document));
				elements.push(document);				
				$cookieStore.put('lastViewedCookie', elements);					
			}else{
				elements.shift();
				elements.push(document);
				$cookieStore.put('lastViewedCookie', elements);
			}
		}
	};

	data.isContained = function(list,element){
		var contained = false;
		for(var index=0; index<element.length; index++){
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