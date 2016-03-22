(function(){
    "use strict";
    angular.module("DevilsFanApp")
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
            return $http.get("/api/project/user?username=" + username)
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/project/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(){
            return $http.get("/api/project/user/");
        }

        function findSingleUser(userId){
            return $http.get("/api/project/user/"+userId+"/");
        }

        function createUser(user){
            return $http.post("/api/project/user/", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId + "/");
        }

        function updateUser(userId, user){
            return $http.put("/api/project/user/" + userId +"/", user);
        }
    }
})();