var q = require("q");
var rosterMock = require("./roster.mock.json");
var uuid = require('node-uuid');

module.exports = function (db) {
    //var PlayerSchema = require("./player.server.schema.js")(mongoose);
    //var PlayerModel = mongoose.model("PlayerModel", PlayerSchema);
    var api = {
        createPlayer: createPlayer,
        findPlayerById: findPlayerById,
        findPlayerByPlayername: findPlayerByPlayername,
        updatePlayer: updatePlayer,
        deletePlayer: deletePlayer,
        findAllPlayers: findAllPlayers,
        checkForNewPlayers: checkForNewPlayers
    };
    return api;

    function createPlayer(player) {
        var player = {
            _id: uuid.v4(),
            playername: player.playername,
            password: player.password,
            email: player.email
        };

        rosterMock.push(player);
        return player;
    }

    function findPlayerById(playerId) {
        for (var i = 0; i < rosterMock.length; i++) {
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

    function calculateAge(birthday) { // birthday is a date
        var x = new Date(birthday);
        var ageDifMs = Date.now() - x.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function checkForNewPlayers(players)
    {
        var newPlayers = [];
        var exists = false;
        for (var i = 0; i < players.length; i++){
            exists = false;
            for (var j =0; j < rosterMock.length; j++){
                if (players[i].name == rosterMock[j].name){
                    exists = true;
                    break;
                }
            }
            if (!exists){
                var newPlayer = {
                    _id: uuid.v4(),
                    name: players[i].name,
                    position: players[i].position,
                    height: players[i].height,
                    weight: players[i].weight,
                    birthday: players[i].birthdate,
                    age: calculateAge(players[i].birthdate),
                    birthPlace: players[i].birthplace,
                    number: players[i].number
                };
                rosterMock.push(newPlayer);
                newPlayers.push(newPlayer);
            }
        }
        console.log(newPlayers);
        return newPlayers;
    }

    function updatePlayer(playerId, player) {
        for (var i = 0; i < rosterMock.length; i++) {
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
        for (var i = 0; i < rosterMock.length; i++) {
            if (rosterMock[i].playername === playerId) {
                rosterMock.splice(i, 1);
            }
        }
        return player;
    }

    function findPlayerByPlayername(name) {
        name.replace('_', ' ');
        for (var i = 0; i < rosterMock.length; i++) {
            if (rosterMock[i].name === name) {
                return rosterMock[i];
            }
        }
        return null;
    }
};