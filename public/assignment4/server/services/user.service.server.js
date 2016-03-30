module.exports = function (app, UserModel) {
    app.post("/api/assignment4/user/", addUser);
    app.get("/api/assignment4/user/", getAllUsers);
    app.get("/api/assignment4/user/:id/", getSingleUser);
    app.get("/api/assignment4/user", getUserQuery);
    app.put("/api/assignment4/user/:id/", updateUser);
    app.delete("/api/assignment4/user/:id/", removeUser);
    app.get("/api/assignment4/loggedin", loggedin);
    app.post("/api/assignment4/logout", logout);

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