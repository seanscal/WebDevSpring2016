var http = require('http');

module.exports = function (app, RosterModel) {

    app.post("/api/project/player/", addPlayer);
    app.post("/api/project/players", checkForNewPlayers);
    app.put("/api/project/players", updateMultiplePlayers);

    app.get("/api/project/player/", getAllPlayers);
    app.get("/api/project/player/:id", getPlayer);
    app.get("/api/project/player", getPlayerQuery);
    app.put("/api/project/player/:id", updatePlayer);
    app.delete("/api/project/player/:id", removePlayer);
    app.get("/api/project/playerInfo", fetchPlayers);
    app.get("/api/project/playerStats", fetchStats);

    app.put("/api/project/player/:id/highlights", addHighlights);


    function addPlayer(req, res) {
        var user = req.body;
        RosterModel.createPlayer(user).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function getAllPlayers(req, res) {
        RosterModel.findAllPlayers().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function getPlayer(req, res) {
        var id = req.params.id;
        RosterModel.findPlayerById(id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updatePlayer(req, res) {
        var id = req.params.id;
        var player = req.body;
        RosterModel.updatePlayer(player._id, player).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateMultiplePlayers(req, res) {
        var players = req.body;
        RosterModel.updateMultiplePlayers(players).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function removePlayer(req, res) {
        var id = req.params.id;
        RosterModel.deletePlayer(id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function getPlayerQuery(req, res) {
        var name = req.query.name;
        var number = req.query.number;
        if (name) {
            RosterModel.findPlayerByPlayername(name).then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
        }
        else if (number) {
            RosterModel.findPlayerByNumber(number).then(
                function (doc) {
                    res.json(doc);
                },
                function (err) {
                    res.status(400).send(err);
                });
        }

    }

    function checkForNewPlayers(req, res) {
        var players = req.body;
        RosterModel.checkForNewPlayers(players).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function addHighlights(req, res) {
        var player = req.body;

        RosterModel.addHighlightToPlayer(player._id, player).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function fetchPlayers(req, res) {
        var options = {
            host: 'nhlwc.cdnak.neulion.com',
            path: '/fs1/nhl/league/teamroster/NJD/iphone/clubroster.json',
            method: 'GET'
        };

        var request = http.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                res.send(JSON.parse(body));
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }

    function fetchStats(req, res) {
        var options = {
            host: 'nhlwc.cdnak.neulion.com',
            path: '/fs1/nhl/league/playerstatsline/20152016/2/NJD/iphone/playerstatsline.json',
            method: 'GET'
        };

        var request = http.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                res.send(JSON.parse(body));
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }
};