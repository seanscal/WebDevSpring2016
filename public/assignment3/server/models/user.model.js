var q = require("q");
var usersMock = require("./user.mock.json");


module.exports = function (mongoose) {
    var UserSchema = require("./user.server.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
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
        user._id = "ID_" + (new Date()).getTime();
        usersMock.push(user);
        return user;
    }

    function findUserById(userId) {
        for (var i in usersMock) {
            if (usersMock[i]._id === userId) {
                return usersMock[i];
            }
        }
        return null;
    }

    function findAllUsers() {
        var users = [];
        for (var i in usersMock) {
            users.push(usersMock[i])
        }
        return users;
    }

    function updateUser(userId, user) {
        for (var i in usersMock) {
            if (usersMock[i]._id === userId) {
                usersMock[i].firstName = user.firstName;
                usersMock[i].lastName = user.lastName;
                usersMock[i].username = user.username;
                usersMock[i].password = user.password;
                usersMock[i].email = user.email;
            }
        }
    }

    function deleteUser(userId) {
        for (var i in usersMock) {
            if (usersMock[i].username === userId) {
                usersMock.pop(user);
            }
        }
        return user;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        for (var i in usersMock) {
            if (usersMock[i].username === userId && usersMock[i].password == credentials.password) {
                return usersMock[i];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var i in usersMock) {
            if (usersMock[i].id === username) {
                return usersMock[i];
            }
        }
        return null;
    }
};