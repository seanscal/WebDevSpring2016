
var Promise = require("q");

module.exports = function(mongoose) {
    var Promise = require('bluebird');
    var UserSchema = require("./user.server.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser: createUser,
        getAllUsers: getAllUsers,
        getUserById: getUserById,
        getUsersForUserId: getUsersForUserId,
        updateUser: updateUser
    };
    return api;

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err, doc){
            doc.title = user.title;
            doc.save(function(err, doc){
                return doc.data;
            })
        })
        return deferred.promise;
    }

    function getUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function(err,user){
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function getUsersForUserId(userId) {
        var deferred = q.defer();
        UserModel.find({userId: userId}, function(err,users){
            deferred.resolve(users);
        })
        return deferred.promise;
    }

    function getAllUsers() {
        var deferred = q.defer();
        UserModel.find(function(err,users){
            deferred.resolve(users);
        })
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        UserModel.create(user,
            function(err, doc){
                if(err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            })
        return deferred.promise;
    }
};