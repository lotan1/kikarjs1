hakikar.controller('createIdea', ['$scope', '$state', '$timeout', 'server', '$rootScope', function ($scope, $state, $timeout, server, $rootScope) {

    $scope.create = function () {

        $timeout(function () {

            var req = {
                name: $scope.name,
                text: $scope.text,
                linkA: $scope.linkA,
                linkB: $scope.linkB,
            }
            server.request('crateProject', req, "POST",'')
                .then(function (data) {
                    $timeout(function () {
                        $scope.somthingWrong = false;
						alert(data);
					
						
                    }, 0);
                }, function (data) {
                    alert("error");
                });
        }, 0);
    }

} ]);

