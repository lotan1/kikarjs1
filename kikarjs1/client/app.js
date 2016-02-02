var torScoreApp = angular.module('torScoreApp', ['ui.router'])

/**** UI Router ****/
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider
		.state("login", {
		    url: "/login",
		    views: {
		        "main": {
		            templateUrl: "components/login/login.html",
		            controller: "login"
		        }
		    }
		})
        .state("innerPageA", {
            url: "/innerPageA",
            views: {
                "main": {
                    templateUrl: "components/innerPageA/innerPageA.html",
                    controller: "innerPageA"
                }
            }
        })
        .state("innerPageB", {
            url: "/innerPageB",
            views: {
                "main": {
                    templateUrl: "components/innerPageB/innerPageB.html",
                    controller: "innerPageB"
                }
            }
        })
        
        
        
});
