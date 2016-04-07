var q = require("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
    var GoalSchema = require("./goals.server.schema.js")(mongoose);
    var PlayerSchema = require("./player.server.schema.js")(mongoose, GoalSchema);
    var PlayerModel = mongoose.model("Players", PlayerSchema);

    var api = {
        createPlayer: createPlayer,
        findPlayerById: findPlayerById,
        updatePlayer: updatePlayer,
        findAllPlayers: findAllPlayers,
        checkForNewPlayers: checkForNewPlayers,
        updateMultiplePlayers: updateMultiplePlayers,
        getPicture: getPicture,
        findPlayerByNumber: findPlayerByNumber,
        addHighlightToPlayer: addHighlightToPlayer
    };
    return api;

    function getPicture(name) {
        var hyphs = name.replace(' ', '-');
        var pers = hyphs.replace('.', '');
        var apos = pers.replace("'", "");
        return ("http://tsnimages.tsn.ca/ImageProvider/PlayerHeadshot?seoId=" + apos)
    }

    function calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function createPlayer(player) {
        var newPlayer = {
            name: player.name,
            position: player.position,
            height: player.height,
            weight: player.weight,
            birthday: new Date(player.birthdate),
            age: calculateAge(new Date(player.birthdate)),
            birthPlace: player.birthplace,
            number: parseInt(player.number),
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
                            deferred.resolve(doc);
                        }
                    });
                }
                else {
                    deferred.resolve(null);
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

    function findPlayerByNumber(number) {
        var deferred = q.defer();
        var num = parseInt(number);

        PlayerModel.findOne(
            {
                number: num
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

    function checkForNewPlayers(players) {
        var deferred = q.defer();
        for (var i = 0; i < players.length; i++) {
            createPlayer(players[i]).then(function (player) {
                deferred.resolve(player);
            });
        }
        return deferred.promise;
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

    function addHighlightToPlayer(playerId, player) {
        var deferred = q.defer();
        var newHighlights = player.highlights;
        findPlayerById(playerId).then(function (res) {
            playerId = res._id;
            delete res._id;
            var highlightsContains = false;
            for(var y = 0; y < newHighlights.length; y++){
                for (var z = 0; z < res.highlights.length; z++)
                {
                    if (res.highlights[z].player1total == newHighlights[y].player1total){
                        highlightsContains = true;
                    }
                }
                if(!highlightsContains){
                    res.highlights.push(newHighlights[y]);
                }
                highlightsContains = false;
            }

            var newPlayer = {
                highlights: res.highlights
            };

            PlayerModel.update({_id: playerId}, newPlayer, function (err, response) {
                if(err){
                    deferred.resolve(err);
                }
                else{
                }
                findPlayerById(playerId).then(function (player) {
                    //console.log("NEW");/
                    //console.log(player);
                    deferred.resolve(player);
                });
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
}
;