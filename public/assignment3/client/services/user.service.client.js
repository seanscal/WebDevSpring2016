(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope){

        var factory = {
        };

        factory.findUserByUsername = function(username){
            return $http.get("/api/assignment/user?username=" + username)
        }

        factory.findUserByCredentials = function(username,password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        factory.findAllUsers = function(){
            return $http.get("/api/assignment/user/");
        }

        factory.findSingleUser = function(userId){
            return $http.get("/api/assignment/user/"+userId+"/");
        }

        factory.createUser = function(user){
            return $http.post("/api/assignment/user/", user);
        }

        factory.deleteUserById = function(userId) {
            return $http.delete("/api/assignment/user/" + userId + "/");
        }

        factory.updateUser = function(userId, user){
           return $http.put("/api/assignment/user/" + userId +"/", user);
        }

        return factory;
    }
})();