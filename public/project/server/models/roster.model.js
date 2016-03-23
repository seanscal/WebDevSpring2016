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
        var newPlayer = {
            _id: uuid.v4(),
            name: player.name,
            position: player.position,
            height: player.height,
            weight: player.weight,
            birthday: player.birthdate,
            age: calculateAge(player.birthdate),
            birthPlace: player.birthplace,
            number: player.number
        };
        rosterMock.push(newPlayer);
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
                var newPlayer = createPlayer(players[i]);
                newPlayers.push(newPlayer);
            }
        }
        return newPlayers;
    }

    function updatePlayer(playerId, player) {
        for (var i = 0; i < rosterMock.length; i++) {
            if (rosterMock[i]._id === playerId) {
                rosterMock[i].name = player.name;
                rosterMock[i].height = player.height;
                rosterMock[i].weight = player.weight;
                rosterMock[i].birthday = player.birthday;
                rosterMock[i].age = player.age;
                rosterMock[i].birthPlace = player.birthPlace;
                rosterMock[i].number = player.number;
                return rosterMock[i];
            }
        }
        return null;
    }

    function deletePlayer(playerId) {
        for (var i = 0; i < rosterMock.length; i++) {
            if (rosterMock[i]._id === playerId) {
                return rosterMock.splice(i, 1);
            }
        }
        return null;
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