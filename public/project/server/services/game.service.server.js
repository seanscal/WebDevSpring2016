var http = require('http');

module.exports = function (app, GameModel) {

    app.post("/api/project/game/", addGame);
    app.post("/api/project/games", addGames);
    app.put("/api/project/games", updateMultipleGames);
    app.get("/api/project/game/:id", getGame);
    app.put("/api/project/game/:id", updateGame);
    app.get("/api/project/:monthId/:yearId/basicGameInfo", fetchGames);


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

    function removeGame(req, res) {
        var id = req.params.id;
        GameModel.deleteGame(id).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function addGames(req, res){
        var games = req.body;
        GameModel.addGames(games).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function fetchGames(req, res){
        var month = req.params.monthId;
        var year = req.params.yearId;

        var options = {
            host: 'nhlwc.cdnak.neulion.com',
            path: '/fs1/nhl/league/clubschedule/NJD/'+year+'/' + month + '/iphone/clubschedule.json',
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