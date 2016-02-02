hakikar.directive('header', ['$state', '$rootScope', function ($state, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: './directives/header/header.html',
        link: function (scope, el, attrs) {
           scope.headerClick = function(){
               alert()
           }

        },
        replace: true
    };


} ]);

