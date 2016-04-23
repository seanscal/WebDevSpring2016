(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $rootScope){

        var service = {
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            findSingleUser: findSingleUser,
            deleteUserById: deleteUserById,
            createUser: createUser,
            updateUser: updateUser,
            login: login,
            logout: logout,
            register: register,
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            isAdmin: isAdmin
        };

        return service;

        function isAdmin(user){

            console.log("At is admin");

            console.log(user.roles);

            for (var x = 0; x < user.roles.length; x++){
                if (user.roles[x] == "admin"){
                    return true;
                }
            }
            return false;
        }

        function findUserByUsername(username){
            return $http.get("/api/assignment5/user?username=" + username)
        }

        function findUserByCredentials(username,password) {
            return $http.get("/api/assignment5/user?username=" + username + "&password=" + password);
        }

        function findAllUsers(){
            return $http.get("/api/assignment5/user/");
        }

        function findSingleUser(userId){
            return $http.get("/api/assignment5/user/"+userId+"/");
        }

        function createUser(user){
            return $http.post("/api/assignment5/user/", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/assignment5/user/" + userId + "/");
        }

        function updateUser(userId, user){
            return $http.put("/api/assignment5/user/" + userId +"/", user);
        }

        function login(user) {
            return $http.post('/api/assignment5/login', user);
        }

        function logout() {
            return $http.post('/api/assignment5/logout');
        }

        function register(user) {
            return $http.post('/api/assignment5/register', user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();