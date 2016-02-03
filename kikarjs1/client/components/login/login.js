hakikar.controller('login', ['$scope', '$state', '$timeout', 'server', '$rootScope', function ($scope, $state, $timeout, server, $rootScope) {
  

	$scope.login = function () {
		
		$timeout(function () {
            
            var req = {
                email: $scope.email,
                password: $scope.password,

            }
            server.request('login', req, "POST",'')
		.then(function (data) {
		    $timeout(function () {
		        $scope.somthingWrong = false;
		        if ((data) && (data.statusCode == 0)) 
				{
					alert("ok");
				    console.log(data);
		        }
		        if ((data) && (data.statusCode == 1)) {
		            $scope.userNotFound = true;
					alert(data.status);
		            return;
		        }
		        if ((data) && (data.statusCode == 2)) {
		            $scope.wrongPassword = true;
		            return;
		        }
		    }, 0);
		}, function (data) {
		    alert("error");
		});
        }, 0);
	}
	
} ]);