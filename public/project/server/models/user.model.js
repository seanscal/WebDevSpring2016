var q = require("q");
var uuid = require('node-uuid');
var bcrypt = require('bcrypt-nodejs');

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

        user.password = bcrypt.hashSync(user.password);

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


        var deferred = q.defer();

        User.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log(doc);
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

        User.findOne({_id : userId}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                if(doc) {
                    if(doc.password != user.password) {
                        user.password = bcrypt.hashSync(user.password);
                    }

                    User.update({ _id: userId }, user, function(err, result) {
                        if(err) {
                            deferred.reject(err);
                        } else {
                            findUserBySsn(ssn).then(function(user) {
                                deferred.resolve(user);
                            });
                        }
                    });

                } else {
                    deferred.reject('Update failed: user not found.')
                }
            }
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

        User.findOne({username: username}, function(err, doc) {
            if(err) {
                deferred.reject(err);
            } else {
                if(doc && bcrypt.compareSync(password, doc.password)) {
                    deferred.resolve(doc);
                } else {
                    deferred.reject('Invalid password.');
                }
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