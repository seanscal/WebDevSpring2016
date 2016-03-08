(function(){
    'use strict';

    var URL = '../../assets/clubroster.json';

    angular
        .module("DevilsFanApp")
        .factory("RosterService", RosterService);

    function RosterService($rootScope, $http, $q) {
        var model = {
            players: [],
            fetchPlayers: fetchPlayers,
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

        function fetchPlayers(callback) {

            var deferred = $q.defer();

            $http.get(URL)
                .success(function (response) {
                    var data = angular.fromJson(response);
                    for (var g = 0; g < data.goalie.length; g++) {
                        var player = model.findPlayerByName(data.goalie[g].name);
                        var age = calculateAge(new Date(data.goalie[g].birthdate));
                        if (player == null) {
                            var newPlayer = {
                                _id: (new Date).getTime(),
                                name: data.goalie[g].name,
                                position: data.goalie[g].position,
                                height: data.goalie[g].height,
                                weight: data.goalie[g].weight,
                                birthday: data.goalie[g].birthdate,
                                age: age,
                                birthPlace: data.goalie[g].birthplace,
                                number: data.goalie[g].number
                            };
                            model.players.push(newPlayer);
                        }
                    }
                    for (var d = 0; d < data.defensemen.length; d++) {
                        var player = model.findPlayerByName(data.defensemen[d].name);
                        var age = calculateAge(new Date(data.defensemen[d].birthdate));
                        if (player == null) {
                            var newPlayer = {
                                _id: (new Date).getTime(),
                                name: data.defensemen[d].name,
                                position: data.defensemen[d].position,
                                height: data.defensemen[d].height,
                                weight: data.defensemen[d].weight,
                                birthday: data.defensemen[d].birthdate,
                                age: age,
                                birthPlace: data.defensemen[d].birthplace,
                                number: data.defensemen[d].number
                            };
                            model.players.push(newPlayer);
                        }
                    }
                    for (var f = 0; f < data.forwards.length; f++) {
                        var player = model.findPlayerByName(data.forwards[f].name);
                        var age = calculateAge(new Date(data.forwards[f].birthdate));
                        if (player == null) {
                            var newPlayer = {
                                _id: (new Date).getTime(),
                                name: data.forwards[f].name,
                                position: data.forwards[f].position,
                                height: data.forwards[f].height,
                                weight: data.forwards[f].weight,
                                birthday: data.forwards[f].birthdate,
                                age: age,
                                birthPlace: data.forwards[f].birthplace,
                                number: data.forwards[f].number
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