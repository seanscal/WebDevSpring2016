var q = require("q");
var usersMock = require("./user.mock.json");


module.exports = function(mongoose) {
    var UserSchema = require("./user.server.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser: createUser,
        getAllUsers: getAllUsers,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function getAllUsers() {
        var deferred = q.defer();

        setTimeout(
            function() {
                deferred.resolve(usersMock);
            },
            100
        );

        return deferred.promise;
    }

    function updateUser(userId, doc) {
        for(var i in mock) {
            if (usersMock[i]._id === userId) {
                usersMock[i].firstName = doc.firstName;
                usersMock[i].lastName = doc.lastName;
                usersMock[i].username = doc.username;
                usersMock[i].password = doc.password;
                usersMock[i].email = doc.email;
            }
        }
    }

    function deleteUser(user) {
        for(var i in mock) {
            if (usersMock[i].username === userId && usersMock[i].password == credentials.password) {
                mock.pop(user);
            }
        }
        return user;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        for(var i in mock) {
            if (usersMock[i].username === userId && usersMock[i].password == credentials.password) {
                return mock[usersMock];
            }
        }
            return null;
        }

    function findUserByUsername(username) {
        for(var i in mock) {
            if(usersMock[i].id === username) {
                return mock[i];
            }
        }
        return null;
    }
};