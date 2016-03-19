(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope){

        var service = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findSingleUser: findSingleUser,
            deleteUserById: deleteUserById,
            createUser: createUser,
            updateUser: updateUser
        };

        return service;

        function findUserByUsername(username){
            return $http.get("/api/assignment/user?username=" + username)
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/assignment/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(){
            return $http.get("/api/assignment/user/");
        }

        function findSingleUser(userId){
            return $http.get("/api/assignment/user/"+userId+"/");
        }

        function createUser(user){
            return $http.post("/api/assignment/user/", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment/user/" + userId + "/");
        }

        function updateUser(userId, user){
           return $http.put("/api/assignment/user/" + userId +"/", user);
        }
    }
})();