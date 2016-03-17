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
            updateUser: updateUser,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser
        };

        return service;

        function findUserByUsername(username){
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findUserByCredentials(username,password){
            var deferred = $q.defer();
            $http.get("/api/assignment/user?username=" + username + "&password=" + password).success(function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllUsers(){
            var deferred = $q.defer();
            $http.get("/api/assignment/user/").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function findSingleUser(userId){
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+userId+"/").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createUser(user){
            var deferred = $q.defer();

            $http.post("/api/assignment/user/", user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteUserById(userId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/user/" +userId+"/").success(function(response){
                if (res.ok == 1) {
                    $http.get("/api/assignment/user").success(function (users) {
                        deferred.resolve(users);
                    });
                }
            });
            return deferred.promise;
        }

        function updateUser(userId, user){
            var deferred = $q.defer();
            $http.put("/api/assignment/user/" + userId +"/", user).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();