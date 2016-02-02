torScoreApp.controller('login', ['$rootScope', '$scope', '$state', function ($rootScope, $scope, $state) {
    $scope.enterClick = function () {
        $state.transitionTo('welcome');
    }
} ]);