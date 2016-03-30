var q = require("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
    var PlayerSchema = require("./player.server.schema.js")(mongoose);
    var PlayerModel = mongoose.model("Players", PlayerSchema);

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
            name: player.name,
            position: player.position,
            height: player.height,
            weight: player.weight,
            birthday: new Date(player.birthdate),
            age: calculateAge(new Date(player.birthdate)),
            birthPlace: player.birthplace,
            number: player.number,
            updated: Date.now(),
            playerId: player.id,
            pictureLink: getPicture(player.name)
        };

        var deferred = q.defer();

        findPlayerByName(newPlayer.name).then(
            function (doc) {
                if (!doc) {
                    PlayerModel.create(newPlayer, function (err, doc) {
                        if (err) {
                            console.log(err);
                            deferred.reject(err);
                        } else {
                            //console.log("ADDED");
                            //console.log(doc);
                            deferred.resolve(doc);
                        }
                    });
                }
                else {
                    //deferred.resolve("NOT HERE");
                }
            },
            function (err) {
                deferred.reject(err);
            });

        return deferred.promise;
    }

    function findPlayerById(playerId) {
        var deferred = q.defer();
        PlayerModel.findById(playerId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findPlayerByPlayerId(playerId) {
        var deferred = q.defer();

        PlayerModel.findOne(
            {
                playerId: playerId
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllPlayers() {
        var deferred = q.defer();
        PlayerModel.find(function (err, players) {
            deferred.resolve(players);
        });
        return deferred.promise;
    }

    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function findPlayerByName(name) {
        var deferred = q.defer();

        PlayerModel.findOne(
            {
                name: name
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }


    //TODO: Check for if the player exists before creating it
    function checkForNewPlayers(players) {
        var deferred = q.defer();
        for (var i = 0; i < players.length; i++) {
            createPlayer(players[i]).then(function (player) {
                deferred.resolve(player);
            });
        }
        return deferred.promise;
    }

    function getPicture(name) {
        var hyphs = name.replace(' ', '-');
        var pers = hyphs.replace('.', '');
        var apos = pers.replace("'", "");
        return ("http://tsnimages.tsn.ca/ImageProvider/PlayerHeadshot?seoId=" + apos)
    }

    function updatePlayer(playerId, player) {
        var deferred = q.defer();
        delete player._id;
        PlayerModel.update({playerId: playerId}, player, function (err, response) {
            findPlayerByPlayerId(playerId).then(function (player) {
                deferred.resolve(player);
            });
        });
        return deferred.promise;
    }


    function updateMultiplePlayers(players) {

        var deferred = q.defer();
        for (x in players) {
            players[x].updated = Date.now();
            updatePlayer(players[x]._id, players[x]).then(
                function (res) {
                    deferred.resolve(res);
                });
        }
        return deferred.promise;
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
}
;