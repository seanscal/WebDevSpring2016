(function () {
    'use strict';

    angular
        .module("DevilsFanApp")
        .factory("RosterService", RosterService);

    function RosterService($http) {
        var model = {
            players: [],
            fetchPlayers: fetchPlayers,
            findPlayerByName: findPlayerByName,
            findAllPlayers: findAllPlayers,
            createPlayer: createPlayer,
            deletePlayerById: deletePlayerById,
            updatePlayer: updatePlayer,
            findPlayerById: findPlayerById,
            fetchStats: fetchStats,
            updateMultiplePlayers: updateMultiplePlayers,
            findPlayerByNumber: findPlayerByNumber,
            addHighlights: addHighlights,
            updatePlayerTopHighlight: updatePlayerTopHighlight
        };
        return model;

        function findAllPlayers() {
            return $http.get("/api/project/player/");
        }

        function createPlayer(player) {
            return $http.post("/api/project/player/", player);
        }

        function findPlayerByName(name) {
            name.replace(' ', '_');
            return $http.get("/api/project/player?name=" + name);
        }

        function findPlayerByNumber(number) {
            return $http.get("/api/project/player?number=" + number);
        }

        function findPlayerById(playerId) {
            return $http.get("/api/project/player/" + playerId);
        }

        function updatePlayer(player) {
            return $http.put("/api/project/player/" + player._id, player);
        }

        function updatePlayerTopHighlight(player) {
            console.log(player);
            return $http.put("/api/project/player/" + player._id + "/topFive", player);
        }

        function addHighlights(player) {
            return $http.put("/api/project/player/" + player._id + "/highlights", player);
        }

        function deletePlayerById(playerId) {
            return $http.delete("/api/project/player/" + playerId).then(function (res) {
                return findAllPlayers().then(function (res) {
                    if (res.data.length > 0) {
                        model.players = res.data;
                    }
                    return model.players;
                });
            });
        }

        function checkForNewPlayers(players) {
            return $http.post("/api/project/players", players);
        }

        function updateMultiplePlayers(players) {
            return $http.put("/api/project/players", players);
        }

        function fetchStats() {
            var updaterArray = [];
            return $http.get('/api/project/playerStats')
                .then(function (response) {
                    var data = angular.fromJson(response.data);
                    for (var i in data.skaterData) {
                        var skaterString = data.skaterData[i].data;
                        var skateArray = skaterString.split(', ');
                        var updater = {
                            _id: data.skaterData[i].id,
                            games: skateArray[3],
                            goals: skateArray[4],
                            assists: skateArray[5],
                            points: skateArray[6],
                            plusminus: skateArray[7],
                            pim: skateArray[8],
                            shots: skateArray[9],
                            timeonice: skateArray[10],
                            PP: skateArray[11],
                            SH: skateArray[12],
                            GWG: skateArray[13],
                            OT: skateArray[14]
                        };
                        updaterArray.push(updater);
                    }
                    for (var i in data.goalieData) {
                        var skaterString = data.goalieData[i].data;
                        var skateArray = skaterString.split(', ');
                        var updater = {
                            _id: data.goalieData[i].id,
                            games: skateArray[3],
                            wins: skateArray[4],
                            losses: skateArray[5],
                            overtimeLosses: skateArray[6],
                            goalsAgainst: skateArray[7],
                            shotsAgainst: skateArray[8],
                            saves: skateArray[9],
                            savePercentage: skateArray[10],
                            GAA: skateArray[11],
                            shutouts: skateArray[12],
                            pim: skateArray[13],
                            minutes: skateArray[14]
                        };
                        updaterArray.push(updater);
                    }
                    return updateMultiplePlayers(updaterArray).then(function(res){
                    });
                });
        }

        function fetchPlayers() {
            return $http.get('/api/project/playerInfo')
                .then(function (response) {
                    var data = angular.fromJson(response.data);
                    return checkForNewPlayers(data.goalie).then(function (res) {
                        if (res.data) {
                            for (var x = 0; x < res.data.length; x++) {
                                model.players.push(res.data[x]);
                            }
                        }
                        return checkForNewPlayers(data.defensemen).then(function (res) {
                            if (res.data) {
                                for (var x = 0; x < res.data.length; x++) {
                                    model.players.push(res.data[x]);
                                }
                            }
                            return checkForNewPlayers(data.forwards).then(function (res) {
                                if (res.data) {
                                    for (var x = 0; x < res.data.length; x++) {
                                        model.players.push(res.data[x]);
                                    }
                                }
                                return findAllPlayers().then(function (res) {
                                    if (res.data.length > 0) {
                                        model.players = res.data;
                                    }
                                    return model.players;
                                });
                            });
                        });
                    });
                });
        }
    }
}());