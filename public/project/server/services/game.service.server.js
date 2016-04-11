var http = require('http');

module.exports = function (app, GameModel) {

    app.get("/api/project/games/", getAllGames);
    app.get("/api/project/games/:id", getGame);
    app.get("/api/project/:monthId/:yearId/basicGameInfo", fetchGames);
    app.get('/api/project/:gameId/gameStats', fetchGameStats);
    app.get('/api/project/:gameId/highlightId', fetchHighlightIds);

    app.put("/api/project/games", updateMultipleGames);
    app.put("/api/project/games/:id", updateGame);
    app.put("/api/project/games/:gameId/stats", addStats);


    app.post("/api/project/games/", addGame);
    app.post("/api/project/games", addGames);
    app.post('/api/project/:gameId/highlightString', fetchHighlightStrings);
    app.post("/api/project/:gameId/video/:videoId", updateGameHighlights);


    function addGame(req, res) {
        var user = req.body;
        GameModel.createGame(user).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function getAllGames(req, res) {
        GameModel.findAllGames().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function getGame(req, res) {
        var id = req.params.id;
        GameModel.findGameById(id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateGame(req, res) {
        var game = req.body;
        GameModel.updateGame(game._id, game).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateMultipleGames(req, res) {
        var games = req.body;
        GameModel.updateMultipleGames(games).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateGameHighlights(req, res) {
        var gameId = req.params.gameId;
        var videoId = req.params.videoId;
        var video = req.body;

        GameModel.updateGameHighlights(gameId, videoId, video).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function addGames(req, res) {
        var games = req.body;
        GameModel.addGames(games).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function addStats(req, res) {
        var gameId = req.params.gameId;
        var stats = req.body;
        GameModel.addStats(stats, gameId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function fetchGames(req, res) {
        var month = req.params.monthId;
        var year = req.params.yearId;

        var options = {
            host: 'nhlwc.cdnak.neulion.com',
            path: '/fs1/nhl/league/clubschedule/NJD/' + year + '/' + month + '/iphone/clubschedule.json',
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

    function fetchGameStats(req, res) {
        var gameId = req.params.gameId;

        var options = {
            host: 'live.nhle.com',
            path: '/GameData/20152016/' + gameId + '/gc/gcbx.jsonp',
            method: 'GET'
        };

        var request = http.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                if (body.indexOf("GCBX.load(") > -1) {
                    var lo = body.replace("GCBX.load(", "").slice(0, -1);
                    res.send(JSON.parse(lo));
                }
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }


    function fetchHighlightIds(req, res) {
        var gameId = req.params.gameId;

        var options = {
            host: 'live.nhle.com',
            path: '/GameData/20152016/' + gameId + '/gc/gcgm.jsonp',
            method: 'GET'
        };

        var request = http.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                if (body.indexOf("GCGM.load(") > -1) {
                    var lo = body.replace("GCGM.load(", "").slice(0, -1);
                    res.send(JSON.parse(lo));
                }
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }

    function fetchHighlightStrings(req, res) {
        var feedId = req.body.extId;

        var options = {
            host: 'video.nhl.com',
            path: '/videocenter/servlets/playlist?ids=' + feedId + '&format=json',
            method: 'GET'
        };

        var request = http.request(options, function (response) {
            var body = "";
            response.on('data', function (data) {
                body += data;
            });
            response.on('end', function () {
                if (body.length > 50) {
                    body = body.replace("\\'", "'");
                    setTimeout(function () {
                        res.send(JSON.parse(body));
                    },50);

                }
                else {
                    res.send(null);
                }
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
            res.send(null);
        });
        request.end();
    }
};