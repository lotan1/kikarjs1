hakikar.controller('createProject', ['$scope', '$state', '$timeout', 'server', '$rootScope', function ($scope, $state, $timeout, server, $rootScope) {

	$scope.create = function () {

		$timeout(function () {

            var req = {
				teacherId:user.user._id,
                name: $scope.name,
                text: $scope.text,
				minGroup: $scope.minGroup,
				maxGroup: $scope.maxGroup,
				state: $scope.state,
            }
            server.request('createProject', req, "POST",'')
		.then(function (data) {
		    $timeout(function () {
				alert(data)
		        $scope.somthingWrong = false;
		    }, 0);
		}, function (data) {
		    alert("error");
		});
        }, 0);
	}

} ]);