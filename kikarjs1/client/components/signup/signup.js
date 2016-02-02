hakikar.controller('login', ['$rootScope', '$scope', '$state','$timeOut','server', function ($rootScope, $scope, $state,$timeOut) {
    $scope.enterClick = function () {
        $state.transitionTo('welcome');
    }
	
	
	$scope.login = function () {
		
		var req = {
                email: $scope.email,
                password: $scope.password,
                firstName: $scope.fname,
                lastName: $scope.lname,
                pushKey: app.pushKey,
                platform: app.platform,
                isTeacher : $scope.isTeacher
            }
            server.request('login', req, "POST",'')
		
	}
} ]);