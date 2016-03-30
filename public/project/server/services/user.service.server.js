module.exports = function (app, UserModel) {
    app.post("/api/project/user/", addUser);
    app.get("/api/project/user/", getAllUsers);
    app.get("/api/project/user/:id/", getSingleUser);
    app.get("/api/project/user", getUserQuery);
    app.put("/api/project/user/:id/", updateUser);
    app.delete("/api/project/user/:id/", removeUser);
    app.get("/api/project/loggedin", loggedin);
    app.post("/api/project/logout", logout);

    function addUser(req, res) {
        var user = req.body;
        UserModel.createUser(user).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getAllUsers(req, res) {
        UserModel.findAllUsers().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getSingleUser(req, res) {
        var id = req.params.id;
        UserModel.findUserById(id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function getUserQuery(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (password) {
            UserModel.findUserByCredentials(username, password).then(
                function (doc) {
                    req.session.currentUser = doc;
                    console.log(req.session.currentUser);
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }
        else {
            UserModel.findUserByUsername(username, password).then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
        }
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var user = req.body;
        UserModel.updateUser(id, user).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function removeUser(req, res) {
        var id = req.params.id;
        UserModel.deleteUser(id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            }
        );
    }

    function loggedin(req, res) {
        console.log(req.session.currentUser);
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }
};