(function() {
    'use strict';

    angular
        .module('FormBuilderApp')
        .factory('UserService', UserService);

    function UserService() {
        var theUsers = [];

        var service = {
            users: theUsers,
            findByUsernameAndPassword: findByUsernameAndPassword,
            findAllUsers: findAllUsers,
            createUser: createUser,
            updateUser: updateUser,
            deleteUserById: deleteUserById
        };

        activate();

        return service;

        //////////////////////////////////

        function activate() {
            theUsers.push({"_id":123, "firstName":"Alice",  "lastName":"Wonderland","username":"alice",  "password":"alice"});
            theUsers.push({"_id":234, "firstName":"Bob",    "lastName":"Hope",      "username":"bob",    "password":"bob"});
            theUsers.push({"_id":345, "firstName":"Charlie","lastName":"Brown",     "username":"charlie","password":"charlie"});
            theUsers.push({"_id":456, "firstName":"Dan",    "lastName":"Craig",     "username":"dan",    "password":"dan"});
            theUsers.push({"_id":567, "firstName":"Edward", "lastName":"Norton",    "username":"ed",     "password":"ed"});
        }

        /**
         * Find the user with the given username and password.
         *
         * Callback will be called with user, or null if not found.
         *
         * @param username string, the username to match
         * @param password string, the password to match
         * @param callback fn (user), function that is called when done
         */
        function findByUsernameAndPassword(username, password, callback) {
            var len = this.users.length;
            for (var i = 0; i < len; i++) {
                var user = this.users[i];

                if (user.username === username && user.password === password) {
                    callback(user);
                    return;
                }
            }

            callback(null);
        }

        /**
         * Find all users.
         *
         * Callback will be called with an array of users.
         *
         * @param callback fn (users), function that is called when done
         */
        function findAllUsers(callback) {
            callback(this.users);
        }

        /**
         * Create a user with the given information.
         *
         * Callback will be called with created user.
         *
         * @param user object, the new user object
         * @param callback fn (user), function that is called when done
         */
        function createUser(user, callback) {
            user['_id'] = (new Date()).getTime();
            this.users.push(user);

            callback(user);
        }

        /**
         * Delete the user with the given id.
         *
         * Callback will be called with updated list of users.
         *
         * @param callback fn (users), function that is called when done
         */
        function deleteUserById(id, callback) {
            var len = this.users.length;
            var index;

            for (var i = 0; i < len; i++) {
                var user = this.users[i];

                if (user['_id'] === id) {
                    index = i;
                    break;
                }
            }

            if (index !== undefined) {
                this.users.splice(index, 1);
            }

            callback(this.users);
        }

        /**
         * If user with id exists, sets properties of the user to the properties of the provided user object.
         *
         * Callback will be called with updated user, or null if no user with the specified id exists.
         *
         * @param id integer, the id to find
         * @param user object, the new user object
         * @param callback fn (user), function that is called when done
         */
        function updateUser(id, user, callback) {
            var len = this.users.length;

            for (var i = 0; i < len; i++) {
                var theUser = this.users[i];

                if (theUser['_id'] === id) {
                    for (var prop in user) {
                        if (user.hasOwnProperty(prop)) {
                            console.log(prop);
                            theUser[prop] = user[prop];
                        }
                    }

                    callback(theUser);
                    return;
                }
            }

            callback(null);
        }
    }

}());