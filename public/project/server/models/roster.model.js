var q = require("q");
var rosterMock = require("./roster.mock.json");

module.exports = function (db) {
    //var PlayerSchema = require("./player.server.schema.js")(mongoose);
    //var PlayerModel = mongoose.model("PlayerModel", PlayerSchema);
    var api = {
        createPlayer: createPlayer,
        findPlayerById: findPlayerById,
        findPlayerByPlayername: findPlayerByPlayername,
        updatePlayer: updatePlayer,
        deletePlayer: deletePlayer,
        findAllPlayers: findAllPlayers
    };
    return api;

    function createPlayer(player) {
        var player = {
            _id: (new Date).getTime(),
            playername: player.playername,
            password: player.password,
            email: player.email
        };

        rosterMock.push(player);
        return player;
    }

    function findPlayerById(playerId) {
        for (var i =0; i < rosterMock.length; i++)  {
            if (rosterMock[i]._id === playerId) {
                return rosterMock[i];
            }
        }
        return null;
    }

    function findAllPlayers() {
        var players = [];
        for (var i in rosterMock) {
            players.push(rosterMock[i])
        }
        return players;
    }

    function updatePlayer(playerId, player) {
        for (var i =0; i < rosterMock.length; i++)  {
            if (rosterMock[i]._id === playerId) {
                rosterMock[i].firstName = player.firstName;
                rosterMock[i].lastName = player.lastName;
                rosterMock[i].playername = player.playername;
                rosterMock[i].password = player.password;
                rosterMock[i].email = player.email;
            }
        }
    }

    function deletePlayer(playerId) {
        for (var i =0; i < rosterMock.length; i++) {
            if (rosterMock[i].playername === playerId) {
                rosterMock.splice(i,1);
            }
        }
        return player;
    }

    function findPlayerByPlayername(name) {
        name.replace('_', ' ');
        for (var i =0; i < rosterMock.length; i++)  {
            if (rosterMock[i].name === name) {
                return rosterMock[i];
            }
        }
        return null;
    }
};