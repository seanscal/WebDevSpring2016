(function () {
    'use strict';
    angular
        .module("DevilsFanApp")
        .factory("PlayerService", PlayerService);

    function PlayerService($rootScope, $http, $q) {
        var model = {
            players: [],
            fetchStats: fetchStats,
            setCurrentPlayer: setCurrentPlayer,
            getCurrentPlayer: getCurrentPlayer,
            findPlayerByName: findPlayerByName,
            findAllPlayers: findAllPlayers,
            createPlayer: createPlayer,
            deletePlayerById: deletePlayerById,
            updatePlayer: updatePlayer,
            findPlayerById: findPlayerById
        };
        return model;

        function setCurrentPlayer(player) {
            $rootScope.currentPlayer = player;
        }

        function getCurrentPlayer() {
            return $rootScope.currentPlayer;
        }

        function findAllPlayers(callback) {
            return callback(model.players);
        }

        function createPlayer(player, callback) {
            var player = {
                _id: (new Date).getTime(),
                name: player.name,
                games: player.games,
                goals: player.goals,
                assists: player.assists,
                points: player.goals + player.assists,
                plusminus: player.plusminus,
                pim: player.pim,
                shots: player.shots,
                timeonice: player.timeonice,
                PP: player.PP,
                SH: player.SH,
                GWG: player.GWG,
                OT: player.OT,
            };
            model.players.push(player);
            callback(player);
        }

        function findPlayerByName(name) {
            for (var p in model.players) {
                if (model.players[p].name === name) {
                    return model.players[p];
                }
            }
            return null;
        }

        function findPlayerById(id) {
            for (var p in model.players) {
                if (model.players[p]._id === id) {
                    return model.players[p];
                }
            }
            return null;
        }

        function updatePlayer(playerId, updates, callback) {
            var player = model.findPlayerById(playerId);
            if (player != null) {
                player.name = updates.name;
                player.games = updates.games;
                player.goals = updates.goals;
                player.assists = updates.assists;
                player.points = updates.goals + updates.assists;
                player.plusminus = updates.plusminus;
                player.pim = updates.pim;
                player.shots = updates.shots;
                player.timeonice = updates.timeonice;
                player.PP = updates.PP;
                player.SH = updates.SH;
                player.GWG = updates.GWG;
                player.OT = updates.OT;
                callback(player);
            } else {
                callback(null);
            }
        }

        function deletePlayerById(playerId, callback) {
            var player = model.findPlayerById(playerId);
            if (player != null) {
                var playerIndex = model.players.indexOf(player);
                model.players.splice(playerIndex, 1);
                callback(model.players);
            }
            callback(null);
        }

        function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        function fetchStats(callback) {
            var deferred = $q.defer();
            $http.get('/api/playerStats')
                .then(function (response) {
                    var data = angular.fromJson(response);
                    for (var x = 0; x < data.skaterData.length; x++) {
                        var singleSkater = data.skaterData[x].data.split(',');
                        var player = model.findPlayerByName(singleSkater[2]);
                        if (player == null) {
                            var newPlayer = {
                                _id: (new Date).getTime(),
                                name: singleSkater[2],
                                games: singleSkater[3],
                                goals: singleSkater[4],
                                assists: singleSkater[5],
                                points: singleSkater[6],
                                plusminus: singleSkater[7],
                                pim: singleSkater[8],
                                shots: singleSkater[9],
                                timeonice: singleSkater[10],
                                PP: singleSkater[11],
                                SH: singleSkater[12],
                                GWG: singleSkater[13],
                                OT: singleSkater[14]
                            };
                            model.players.push(newPlayer);
                        }
                    }
                    deferred.resolve(model.players);
                });
            return deferred.promise;
        }
    }
})();