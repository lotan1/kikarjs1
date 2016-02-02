hakikar.factory('server', ['$rootScope', '$http', '$q', '$state', '$timeout', function ($rootScope, $http, $q, $state, $timeout) {
    return {

        request: function (url, request, theMethod,port) {

            var deferred = $q.defer();
			var requestSended = '';
			if (request || request!= ''){
				requestSended =  JSON.stringify(request);
			}
				var httpDetails = {
					url: domain + port + '/'+ url,
					method: theMethod,
					data: requestSended,
					contentType: "application/json"
						
				};

            $http(httpDetails).
            success(function (json) {
                deferred.resolve(json);
            }).
            error(function (err) {
                deferred.reject(err);
               
            });
            return deferred.promise;
        },
		geolcation: function (url) {
			
            var deferred = $q.defer();
            var httpDetails = {
                url: googleGeolocation + url,
                method: 'GET',
                contentType: "application/json"
                	
            };

            $http(httpDetails).
            success(function (json) {
                deferred.resolve(json);
            }).
            error(function (err) {
                deferred.reject(err);
               
            });
            return deferred.promise;
        },


		
        fromRequest: function (url, request) {
			
            var deferred = $q.defer();

            var httpDetails = {
                url: domain +'/'+ url,
                method: "POST",
                data: request,
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            };

            $http(httpDetails).
            success(function (json) {
                deferred.resolve(json);
            }).
            error(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },


    }
} ]);