var q = require("q");
var usersMock = require("./user.mock.json");


module.exports = function (mongoose) {
    var UserSchema = require("./user.server.schema.js")(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);
    var api = {
        createUser: createUser,
        getUser: getUser,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        getAllUsers: getAllUsers
    };
    return api;

    function createUser(user) {
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function getUser(userId) {
        for (var i in usersMock) {
            if (usersMock[i]._id === userId) {
                return usersMock[i];
            }
        }
        return null;
    }

    function getAllUsers() {
        var users = [];
        for (var i in usersMock) {
            users.push(usersMock[i])
        }
        return users;
    }

    function updateUser(userId, doc) {
        for (var i in mock) {
            if (usersMock[i]._id === userId) {
                usersMock[i].firstName = doc.firstName;
                usersMock[i].lastName = doc.lastName;
                usersMock[i].username = doc.username;
                usersMock[i].password = doc.password;
                usersMock[i].email = doc.email;
            }
        }
    }

    function deleteUser(userId) {
        for (var i in mock) {
            if (usersMock[i].username === userId) {
                mock.pop(user);
            }
        }
        return user;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        for (var i in mock) {
            if (usersMock[i].username === userId && usersMock[i].password == credentials.password) {
                return mock[usersMock];
            }
        }
        return null;
    }

    function findUserByUsername(username) {
        for (var i in mock) {
            if (usersMock[i].id === username) {
                return mock[i];
            }
        }
        return null;
    }
};