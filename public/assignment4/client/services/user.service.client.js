(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http){

        var factory = {
        };

        factory.findUserByUsername = function(username){
            return $http.get("/api/assignment4/user?username=" + username)
        };

        factory.findUserByCredentials = function(username,password) {
            return $http.get("/api/assignment4/user?username=" + username + "&password=" + password);
        };

        factory.findAllUsers = function(){
            return $http.get("/api/assignment4/user/");
        };

        factory.findSingleUser = function(userId){
            return $http.get("/api/assignment4/user/"+userId+"/");
        };

        factory.createUser = function(user){
            return $http.post("/api/assignment4/user/", user);
        };

        factory.deleteUserById = function(userId) {
            return $http.delete("/api/assignment4/user/" + userId + "/");
        };

        factory.updateUser = function(userId, user){
           return $http.put("/api/assignment4/user/" + userId +"/", user);
        };

        factory.loggedIn = function(){
            return $http.get("/api/assignment4/loggedin/");
        };

        return factory;
    }
})();