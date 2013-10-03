DigitalLibrary.factory('MenuService', function ($rootScope, $resource, $q, $timeout, CONFIG) {

	var SERVICE_MENU_URL;

	var data = {};
	data.menu = {};
	data.totalItems = 0;
	data.menuLoading = true;
	data.error = false;

	data.getMenu = function(){

		data.menuLoading = true;		
		
		var deferred = $q.defer();
		var MenuServicePromise = deferred.promise;
		var MenuService = $resource(CONFIG.MENU_SERVICE_URL,{})
		.get({},
			sucess = function (event){
				deferred.resolve(event);
			},

			error = function(response){
				deferred.reject(response);
				console.log("Error retreving the data");
			}
		);

		MenuServicePromise.then(
			resolve = function(event){
				data.menu = event.GetMenuResult;
				data.totalItems = data.menu.length;
				data.menuLoading = false;
				data.error = false;
				data.broadcastMenuResponse();
			},
			reject = function(response){
				console.log(response);
				data.menuLoading = false;
				data.error = true;
				data.broadcastError();
			}
		);
	};

	data.broadcastError = function(){
		$rootScope.$broadcast('handleMenuError');
	};

	data.broadcastMenuResponse = function(){
		$rootScope.$broadcast('handleMenuChange');
	};

	data.toString = function(){
		this.data.toString();	
	};

	return data;

});