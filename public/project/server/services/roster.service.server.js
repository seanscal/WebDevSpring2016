var model = require("../models/roster.model.js")();
var http = require('http');

module.exports = function (app) {

    app.post("/api/project/player/", addPlayer);
    app.post("/api/project/players", checkForNewPlayers);
    app.put("/api/project/players", updateMultiplePlayers)

    app.get("/api/project/player/", getAllPlayers);
    app.get("/api/project/player/:id", getPlayer);
    app.get("/api/project/player", getPlayerQuery);
    app.put("/api/project/player/:id", updatePlayer);
    app.delete("/api/project/player/:id", removePlayer);
    app.get("/api/project/playerInfo", fetchPlayers);
    app.get("/api/project/playerStats", fetchStats)


    function addPlayer(req, res) {
        var user = req.body;
        res.json(model.createPlayer(user));
    }

    function getAllPlayers(req, res) {
        res.json(model.findAllPlayers());
    }

    function getPlayer(req, res) {
        var id = req.params.id;
        res.json(model.findPlayerById(id));
    }

    function updatePlayer(req, res) {
        var id = req.params.id;
        var player = req.body;
        res.json(model.updatePlayer(player._id, player));
    }

    function updateMultiplePlayers(req, res) {
        var players = req.body;
        res.json(model.updateMultiplePlayers(players));
    }

    function removePlayer(req, res) {
        var id = req.params.id;
        res.json(model.deletePlayer(id));
    }

    function getPlayerQuery(req, res) {
        var name = req.query.name;
        res.json(model.findPlayerByPlayername(name));
    }

    function checkForNewPlayers(req, res){
        var players = req.body;
        res.json(model.checkForNewPlayers(players));
    }

    function fetchPlayers(req, res){
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
        }

        var request = http.request(options, function (response) {
            var body = ""
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