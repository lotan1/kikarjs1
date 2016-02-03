hakikar.controller('login', ['$scope', '$state', '$timeout', 'server', '$rootScope', function ($scope, $state, $timeout, server, $rootScope) {

	$scope.create = function () {

		$timeout(function () {

            var req = {
                email: $scope.email,
                password: $scope.password,

            }
            server.request('crateProject', req, "POST",'')
		.then(function (data) {
		    $timeout(function () {
		        $scope.somthingWrong = false;
		    }, 0);
		}, function (data) {
		    alert("error");
		});
        }, 0);
	}

} ]);