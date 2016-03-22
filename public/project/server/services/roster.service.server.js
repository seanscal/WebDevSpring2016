var model = require("../models/roster.model.js")();
var http = require('http');

module.exports = function (app) {

    app.post("/api/project/player/", addPlayer);
    app.get("/api/project/player/", getAllPlayers);
    app.get("/api/project/player/:id/", getPlayer);
    app.get("/api/project/player", getPlayerQuery);
    app.put("/api/project/player/:id/", updatePlayer);
    app.delete("/api/project/player/:id/", removePlayer);
    app.get("/api/playerInfo", fetchPlayers);


    function addPlayer(req, res) {
        var user = req.body;
        res.json(model.createUser(user));
    }

    function getAllPlayers(req, res) {
        res.json(model.findAllUsers());
    }

    function getPlayer(req, res) {
        var id = req.params.id;
        res.json(model.findUserById(id));
    }

    function updatePlayer(req, res) {
        var id = req.params.id;
        var user = req.body;
        res.json(model.updateUser(id, user));
    }

    function removePlayer(req, res) {
        var id = req.params.id;
        res.json(model.deleteUser(id));
    }

    function getPlayerQuery(req, res) {
        var name = req.query.name;
        res.json(model.findPlayerByPlayername(name));
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
                console.log("SERVICE\n"+ JSON.parse(body).goalie[0].position);
                res.send(JSON.parse(body));
            });
        });
        request.on('error', function (e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    }
};