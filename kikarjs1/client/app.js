
var domain = 'http://localhost:4500'; //local

var hakikar = angular.module('hakikar', ['ui.router'])

/**** UI Router ****/
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");

    $stateProvider
		.state("home", {
		    url: "/home",
		    views: {
		        "main": {
		            templateUrl: "components/home/home.html",
		            controller: "home"
		        }
		    }
		})

    $stateProvider
		.state("signup", {
		    url: "/signup",
		    views: {
		        "main": {
		            templateUrl: "components/signup/signup.html",
		            controller: "signup"
		        }
		    }
		})
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
