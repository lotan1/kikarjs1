hakikar.controller('login', ['$scope', '$state', '$timeout', 'server', '$rootScope', function ($scope, $state, $timeout, server, $rootScope) {
  

	$scope.login = function () {
		
		$timeout(function () {
            
            var req = {
                email: $scope.email,
                password: $scope.password,
				isTeacher : $scope.isTeacher
            }
            server.request('login', req, "POST",'')
		.then(function (data) {
		    $timeout(function () {
		        $scope.somthingRong = false;
		        if ((data) && (data.statusCode == 0)) 
				{
					alert("ok");
				    console.log(data);
		            // if (data && data.user && data.user.children) {
		                // $rootScope.parent = data.user;
		                // if (data.user.children.length == 0) {
		                    // $state.transitionTo('deviceSetUp');
                            // return;
		                // } else {
		                    // var now = data.user.children[0];
		                    // $rootScope.$broadcast('arrChanges',{load:'new'});
		                // }
		            // }
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