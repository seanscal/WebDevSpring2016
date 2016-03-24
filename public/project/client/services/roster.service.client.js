(function () {
    'use strict';

    angular
        .module("DevilsFanApp")
        .factory("RosterService", RosterService);

    function RosterService($rootScope, $http, $q) {
        var model = {
            players: [],
            fetchPlayers: fetchPlayers,
            setCurrentPlayer: setCurrentPlayer,
            findPlayerByName: findPlayerByName,
            findAllPlayers: findAllPlayers,
            createPlayer: createPlayer,
            deletePlayerById: deletePlayerById,
            updatePlayer: updatePlayer,
            findPlayerById: findPlayerById,
            fetchStats: fetchStats
        };
        return model;

        function setCurrentPlayer(player) {
            $rootScope.currentPlayer = player;
        }

        function findAllPlayers() {
            return $http.get("/api/project/player/");
        }

        function createPlayer(player) {
            return $http.post("/api/project/player/", player);
        }

        function findPlayerByName(name) {
            name.replace(' ', '_');
            return $http.get("/api/project/user?name=" + name);
        }

        function findPlayerById(playerId) {
            return $http.get("/api/project/player/" + playerId);
        }

        function updatePlayer(player) {
            return $http.put("/api/project/player/" + player._id, player);
        }

        function deletePlayerById(playerId) {
            return $http.delete("/api/project/player/" + playerId).then(function(res){
                return findAllPlayers().then(function(res){
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

        function fetchStats() {
            var deferred = $q.defer();
            $http.get('/api/playerStats')
                .then(function (response) {

                });
        }

        function fetchPlayers() {
            return $http.get('/api/playerInfo')
                .then(function (response) {
                    var data = angular.fromJson(response.data);
                    return checkForNewPlayers(data.goalie).then(function(res){
                        for (var x = 0; x < res.data.length; x++) {
                            model.players.push(res.data[x]);
                        }
                        return checkForNewPlayers(data.defensemen).then(function(res){
                            for (var x = 0; x < res.data.length; x++) {
                                model.players.push(res.data[x]);
                            }
                            return checkForNewPlayers(data.forwards).then(function(res){
                                for (var x = 0; x < res.data.length; x++) {
                                    model.players.push(res.data[x]);
                                }
                                return findAllPlayers().then(function(res){
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
})();