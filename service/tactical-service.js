angular.module('tactical').factory('tacticalService',['$http' ,function($http) {

    var restApiNewUri = 'https://newapi.tacticalmastery.com/api/v1.0/';
    
    var postToNewApiServer = function (method , data) {
        return $http.post(restApiNewUri + method , data);
    };
    
    return {
        postToNewApiServer : postToNewApiServer
    };

}]);

