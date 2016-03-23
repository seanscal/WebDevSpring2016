var model = require("../models/roster.model.js")();
var http = require('http');

module.exports = function (app) {

    app.post("/api/project/player/", addPlayer);
    app.post("/api/project/players", checkForNewPlayers);

    app.get("/api/project/player/", getAllPlayers);
    app.get("/api/project/player/:id", getPlayer);
    app.get("/api/project/player", getPlayerQuery);
    app.put("/api/project/player/:id", updatePlayer);
    app.delete("/api/project/player/:id", removePlayer);
    app.get("/api/playerInfo", fetchPlayers);


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
        console.log(id);
        console.log(player);
        console.log(model.updatePlayer(id, player));
        res.json(model.updatePlayer(id, player));
    }

    function removePlayer(req, res) {
        var id = req.params.id;
        console.log("Deleted: " + model.deletePlayer(id).name);
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
};