(function(){
    "use strict";
    angular.module("DevilsFanApp")
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
            console.log("CREATE UPSER");
            return $http.post("/api/project/user/", user);
        }

        function deleteUserById(userId) {
            return $http.delete("/api/project/user/" + userId + "/");
        }

        function updateUser(userId, user){
            return $http.put("/api/project/user/" + userId +"/", user);
        }

        function login(user) {
            return $http.post('/api/project/login', user);
        }

        function logout() {
            return $http.post('/api/project/logout');
        }

        function register(user) {
            return $http.post('/api/project/register', user);
        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }
    }
})();