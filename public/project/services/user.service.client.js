(function(){
    'use strict';

    angular
        .module("DevilsFanApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {	"_id":123, "firstName":"Alice",            "lastName":"Wonderland",
                    "username":"alice",  "password":"alice",   "roles": ["editor"], favoritePlayer:"Travis Zajac"		},
                {	"_id":234, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": [""]		},
                {	"_id":345, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": [""]		},
                {	"_id":456, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["editor"]},
                {	"_id":567, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": [""]		}
            ],
            setCurrentUser: setCurrentUser,
            getCurrentUser: getCurrentUser,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById
        };
        return model;

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findAllUsers(callback) {
            return callback(model.users);
        }

        function createUser (user, callback) {
            var user = {
                _id: (new Date).getTime(),
                username: user.username,
                password: user.password,
                email: user.email
            };
            model.users.push(user);
            callback(user);
        }

        function findUserByUsername (username) {
            for (var u in model.users) {
                if (model.users[u].username === username) {
                    return model.users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    callback(model.users[u]);
                }
            }
            callback(null);
        }

        function findUserById (id) {
            for (var u in model.users) {
                if (model.users[u]._id === id) {
                    return model.users[u];
                }
            }
            return null;
        }

        function updateUser (userId, updates, callback) {
            var user = model.findUserById(userId);
            if (user != null) {
                user.firstName = updates.firstName;
                user.lastName = updates.lastName;
                user.password = updates.password;
                user.email = updates.email;
                user.favoritePlayer = $rootScope.favoritePlayer;
                callback(user);
            } else {
                callback(null);
            }
        }

        function deleteUserById(userId, callback) {
            var user = model.findUserById(userId);
            if(user != null) {
                var userIndex = model.users.indexOf(user);
                model.users.splice(userIndex, 1);
                callback(model.users);
            }
            callback(null);
        }
    }
})();