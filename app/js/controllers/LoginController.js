'use strict';

digitalLibraryApp.controller('LoginCtrl',
	function LoginController($scope){

		$scope.login = function(user) {
			if (user.username == undefined) {
				alert('Introduce tu usuario para continuar.');
			} else if (user.password == undefined) {
				alert('Introduce tu password para continuar.');
			} else {
				if (user.username == 'test' && user.password == 'test') {
					$location.path('/library');
				} else {
					alert('Usuario y contraseña inválidos.');
				}
			}
		};
	}
);