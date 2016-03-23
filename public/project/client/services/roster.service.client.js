(function () {
    'use strict';

    var URL = '/api/playerInfo';

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
            findPlayerById: findPlayerById
        };
        return model;

        function setCurrentPlayer(player) {
            $rootScope.currentPlayer = player;
        }

        function findAllPlayers(callback) {
            return $http.get("/api/project/player/");
        }

        function createPlayer(player, callback) {
            var player = {
                _id: (new Date).getTime(),
                name: player.name,
                position: player.position,
                height: player.height,
                weight: player.weight,
                birthday: player.birthday,
                age: player.age,
                birthPlace: player.birthPlace,
                number: player.number
            };
            model.players.push(player);
            callback(player);
        }

        function findPlayerByName(name) {
            name.replace(' ', '_');
            return $http.get("/api/project/user?name=" + name);
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
                player.position = updates.position;
                player.height = updates.height;
                player.weight = updates.weight;
                player.birthday = updates.birthday;
                player.age = updates.age;
                player.birthPlace = updates.birthPlace;
                player.number = updates.number;
                callback(player);
            } else {
                callback(null);
            }
        }

        function deletePlayerById(playerId) {
            return $http.delete("/api/project/player/" + playerId);
            var player = model.findPlayerById(playerId);
            if (player != null) {
                var playerIndex = model.players.indexOf(player);
                model.players.splice(playerIndex, 1);
                callback(model.players);
            }
            callback(null);
        }



        function checkForNewPlayers(players) {
            return $http.post("/api/project/players", players);
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