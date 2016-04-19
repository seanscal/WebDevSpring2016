var q = require("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
    var UserSchema = require("./user.server.schema.js")(mongoose);
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        findAllUsers: findAllUsers
    };
    return api;

    function createUser(user) {

        var newUser = new User({
            username: user.username,
            password: user.password,
            emails: user.emails,
            firstname: user.firstName,
            lastname: user.lastName,
            roles: ["fan"]
        });

        if (newUser.username == "bob") {
            newUser.roles.push("admin");
        }


        console.log(newUser.roles);

        var deferred = q.defer();
        User.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        User.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        User.find(function (err, users) {
            deferred.resolve(users);
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        delete user._id;
        User.update({_id: userId}, user, function (err, response) {
            findUserById(userId).then(function (user) {
                deferred.resolve(user);
            });
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        User.remove({_id: userId}, function (err, response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        User.findOne(
            {
                username: username,
                password: password
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        User.findOne(
            {
                username: username
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};