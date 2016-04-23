var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, UserModel) {
    var auth = authorized;

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    app.post('/api/assignment5/login', passport.authenticate('local'), login);
    app.get('/api/assignment5/loggedin', loggedin);
    app.post('/api/assignment5/logout', logout);
    app.post('/api/assignment5/register', register);

    app.post("/api/assignment5/user/", addUser);
    app.get("/api/assignment5/user/", getAllUsers);
    app.get("/api/assignment5/user/:id/", getSingleUser);
    app.get("/api/assignment5/user", getUserQuery);
    app.put("/api/assignment5/user/:id/", updateUser);
    app.delete("/api/assignment5/user/:id/", removeUser);
    app.get("/api/assignment5/loggedin", loggedin);
    app.post("/api/assignment5/logout", logout);

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

    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        UserModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function register(req, res) {
        var newUser = req.body;
        newUser.roles = ['admin'];

        console.log("HERE");
        console.log(req.body);

        UserModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return UserModel.createUser(newUser);
                    }
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        console.log("HERE");
                        console.log(user);
                        req.login(user, function (err) {

                            if (err) {
                                console.log(err);
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function (err) {
                    console.log(err);
                    res.status(400).send(err);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function loggedin(req, res) {
        console.log("loggedin");
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        console.log("Logging out");
        req.session.destroy();
        res.send(200);
    }

};