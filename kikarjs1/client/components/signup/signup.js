hakikar.controller('signup', ['$scope', '$state', '$timeout', 'server', '$rootScope', function ($scope, $state, $timeout, server, $rootScope) {
    
	
	
	
	
	$scope.signup = function () {
		
		$timeout(function () {
            
            var req = {
                email: $scope.email,
                password: $scope.password,
                firstName: $scope.fname,
                lastName: $scope.lname,
                isTeacher : $scope.isTeacher
            }
         server.request('signup', req, "POST",'')
		.then(function (data) {
		    $timeout(function () {
		        $scope.somthingWrong = false;
		        if ((data) && (data.statusCode == 0)) 
				{
					alert("ok");
				    console.log(data);
					$rootScope.user = data;
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