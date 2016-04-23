//var passport         = require('passport');
//var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, UserModel) {
    var auth = authorized;

    //passport.use(new LocalStrategy(localStrategy));
    //passport.serializeUser(serializeUser);
    //passport.deserializeUser(deserializeUser);
    //
    //app.post('/api/project/login', passport.authenticate('local'), login);
    //app.get('/api/project/loggedin', loggedin);
    //app.post('/api/project/logout', logout);
    //app.post('/api/project/register', register);

    app.post("/api/project/user/", addUser);
    app.get("/api/project/user/", getAllUsers);
    app.get("/api/project/user/:id/", getSingleUser);
    app.get("/api/project/user", getUserQuery);
    app.put("/api/project/user/:id/", updateUser);
    app.delete("/api/project/user/:id/", removeUser);


    //function localStrategy(username, password, done) {
    //    UserModel
    //        .findUserByCredentials(username, password)
    //        .then(
    //            function(user) {
    //                if (!user) { return done(null, false); }
    //                return done(null, user);
    //            },
    //            function(err) {
    //                if (err) { return done(err); }
    //            }
    //        );
    //}
    //
    //function serializeUser(user, done) {
    //    done(null, user);
    //}
    //
    //function deserializeUser(user, done) {
    //    UserModel
    //        .findUserById(user._id)
    //        .then(
    //            function(user){
    //                done(null, user);
    //            },
    //            function(err){
    //                done(err, null);
    //            }
    //        );
    //}

    //function login(req, res) {
    //    var user = req.user;
    //    res.json(user);
    //}
    //
    //function register(req, res) {
    //    var newUser = req.body;
    //    newUser.roles = ['student'];
    //
    //    UserModel
    //        .findUserByUsername(newUser.username)
    //        .then(
    //            function(user){
    //                if(user) {
    //                    res.json(null);
    //                } else {
    //                    return UserModel.createUser(newUser);
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        )
    //        .then(
    //            function(user){
    //                if(user){
    //                    req.login(user, function(err) {
    //                        if(err) {
    //                            res.status(400).send(err);
    //                        } else {
    //                            res.json(user);
    //                        }
    //                    });
    //                }
    //            },
    //            function(err){
    //                res.status(400).send(err);
    //            }
    //        );
    //}

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

    function addUser(req, res) {
        var user = req.body;
        console.log(user);
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

        console.log("here");
        console.log(username);
        console.log(password);

        if (password) {
            UserModel.findUserByCredentials(username, password).then(
                function (doc) {
                    console.log(doc);
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

    //function loggedin(req, res) {
    //    res.send(req.isAuthenticated() ? req.user : '0');
    //}
    //
    //function logout(req, res) {
    //    console.log("Logging out");
    //    req.session.destroy();
    //    res.send(200);
    //}
};