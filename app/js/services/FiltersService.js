DigitalLibrary.factory('FiltersService', function ($rootScope, $resource, $cookieStore, $q, CONFIG) {

	var data = {};

	data.error = false;
	data.elements = {};

	data.getFilters = function(){

		var deferred = $q.defer();
		var FiltersServicePromise = deferred.promise;
		var FiltersService = $resource(CONFIG.SERVICE_FILTERS,{})
		.get({},

			success = function(event){
				deferred.resolve(event);
			},

			error = function(response){
				data.error = true;
				console.log("Error retreving the data");
			}

		);

		FiltersServicePromise.then(

			resolve = function(event){
				data.elements = event.GetFiltersResult;
				$rootScope.$broadcast('handleFiltersData');
			},

			reject = function(response){
				console.log(response);
			}

		);
	}

	//Return statement
	return data;

});