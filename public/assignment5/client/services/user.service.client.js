(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http){

        var factory = {
        };

        factory.findUserByUsername = function(username){
            return $http.get("/api/assignment5/user?username=" + username)
        };

        factory.findUserByCredentials = function(username,password) {
            return $http.get("/api/assignment5/user?username=" + username + "&password=" + password);
        };

        factory.findAllUsers = function(){
            return $http.get("/api/assignment5/user/");
        };

        factory.findSingleUser = function(userId){
            return $http.get("/api/assignment5/user/"+userId+"/");
        };

        factory.createUser = function(user){
            return $http.post("/api/assignment5/user/", user);
        };

        factory.deleteUserById = function(userId) {
            return $http.delete("/api/assignment5/user/" + userId + "/");
        };

        factory.updateUser = function(userId, user){
           return $http.put("/api/assignment5/user/" + userId +"/", user);
        };

        factory.loggedIn = function(){
            return $http.get("/api/assignment5/loggedin/");
        };

        return factory;
    }
})();