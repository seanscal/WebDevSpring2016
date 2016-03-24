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
        checkForNewPlayers: checkForNewPlayers,
        updateMultiplePlayers: updateMultiplePlayers,
        getPicture: getPicture
    };
    return api;

    function createPlayer(player) {
        var newPlayer = {
            _id: player.id,
            name: player.name,
            position: player.position,
            height: player.height,
            weight: player.weight,
            birthday: new Date(player.birthdate),
            age: calculateAge(new Date(player.birthdate)),
            birthPlace: player.birthplace,
            number: player.number
        };
        rosterMock.push(newPlayer);
        return player;
    }

    function findPlayerById(playerId) {
        for (var i = 0; i < rosterMock.length; i++) {
            if (rosterMock[i]._id == playerId) {
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
        var ageDifMs = Date.now() - birthday.getTime();
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

    function getPicture(name){
        var hyphs = name.replace(' ', '-');
        var pers = hyphs.replace('.', '');
        var apos = pers.replace("'", "");
        return ("http://tsnimages.tsn.ca/ImageProvider/PlayerHeadshot?seoId=" +apos)
    }

    function updatePlayer(playerId, player) {
        for (var i = 0; i < rosterMock.length; i++) {
            if (rosterMock[i]._id === playerId) {

                rosterMock[i]._type = "player";


                //General Information
                rosterMock[i].name = rosterMock[i].name || player.name;
                rosterMock[i].height = player.height || rosterMock[i].height;
                rosterMock[i].weight = player.weight || rosterMock[i].weight;
                rosterMock[i].age = player.age || rosterMock[i].age ;
                rosterMock[i].birthPlace = player.birthPlace || rosterMock[i].birthPlace;
                rosterMock[i].number = player.number || rosterMock[i].number;
                rosterMock[i].pictureLink = getPicture(rosterMock[i].name);

                //Player stats
                rosterMock[i].goals = player.goals || rosterMock[i].goals;
                rosterMock[i].assists = player.assists || rosterMock[i].assists;
                rosterMock[i].points = player.points || rosterMock[i].points;
                rosterMock[i].plusminus = player.plusminus || rosterMock[i].plusminus;
                rosterMock[i].shots = player.shots || rosterMock[i].shots;
                rosterMock[i].timeonice = player.timeonice || rosterMock[i].timeonice;
                rosterMock[i].PP = player.PP || rosterMock[i].PP;
                rosterMock[i].SH = player.SH || rosterMock[i].SH ;
                rosterMock[i].GWG = player.GWG || rosterMock[i].GWG;
                rosterMock[i].OT = player.OT || rosterMock[i].OT;

                //Goalie Stats
                rosterMock[i].wins = player.wins || rosterMock[i].wins;
                rosterMock[i].losses = player.losses || rosterMock[i].losses;
                rosterMock[i].overtimeLosses = player.overtimeLosses || rosterMock[i].overtimeLosses;
                rosterMock[i].goalsAgainst = player.goalsAgainst || rosterMock[i].goalsAgainst;
                rosterMock[i].shotsAgainst = player.shotsAgainst || rosterMock[i].shotsAgainst;
                rosterMock[i].saves = player.saves || rosterMock[i].saves;
                rosterMock[i].savePercentage = player.savePercentage || rosterMock[i].savePercentage;
                rosterMock[i].GAA = player.GAA || rosterMock[i].GAA;
                rosterMock[i].shutouts = player.shutouts || rosterMock[i].shutouts ;
                rosterMock[i].minutes = player.minutes || rosterMock[i].minutes;

                //both types
                rosterMock[i].games = player.games || rosterMock[i].games;
                rosterMock[i].pim = player.pim || rosterMock[i].pim;

                return rosterMock[i];
            }
        }
        return null;
    }


    function updateMultiplePlayers(players) {
        var updated = [];
        for(x in players){
            updated.push(updatePlayer(players[x]._id, players[x]));
        }
        return updated;
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