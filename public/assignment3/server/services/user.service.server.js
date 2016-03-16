var model = require("../models/user.model.js")();

module.exports = function (app) {

    app.post("/api/assignment/user", addUser);
    app.get("/api/assignment/user", getAllUsers);
    app.get("/api/assignment/user/:id", getSingleUser);
    app.get("/api/assignment/user?username=username", getUserByUsername);
    app.get("/api/assignment/user?username=username&password=password", getUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", removeUser);

    function addUser(req, res) {
        var user = req.body;
        res.json(model.createUser(user));
    }

    function getAllUsers(req, res) {
        res.json(model.findAllUsers());
    }

    function getSingleUser(req, res) {
        var id = req.params.id;
        res.json(model.findUserById(id));
    }

    function getUserByUsername(req, res) {
        var username = req.query.username;
        res.json(model.findUserByUsername(username));
    }

    function getUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        var credentials;
        credentials.username = username;
        credentials.password = password;
        res.json(model.findUserByCredentials(credentials));
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(model.update(id, user));
    }

    function removeUser(req, res) {
        var id = req.params.id;
        res.json(model.deleteUser(id));
    }
};