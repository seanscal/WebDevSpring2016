(function(){
    'use strict';

    var URL = 'http://cors.io/?u=http://nhlwc.cdnak.neulion.com/fs1/nhl/league/teamroster/NJD/iphone/clubroster.json';

    angular
        .module("DevilsFanApp")
        .factory("RosterService", RosterService);

    function RosterService($rootScope) {
        var model = {
            players: [],
            updatePlayers: updatePlayers,
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

        function setCurrentPlayer (player) {
            $rootScope.currentPlayer = player;
        }

        function getCurrentPlayer () {
            return $rootScope.currentPlayer;
        }

        function findAllPlayers(callback) {
            return callback(model.players);
        }

        function createPlayer (player, callback) {
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

        function findPlayerByName (name) {
            for (var p in model.players) {
                if (model.players[p].name === name) {
                    return model.players[p];
                }
            }
            return null;
        }

        function findPlayerById (id) {
            for (var p in model.players) {
                if (model.players[p]._id === id) {
                    return model.players[p];
                }
            }
            return null;
        }

        function updatePlayer (playerId, updates, callback) {
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
            if(player != null) {
                var playerIndex = model.players.indexOf(player);
                model.players.splice(playerIndex, 1);
                callback(model.players);
            }
            callback(null);
        }

        function updatePlayers(callback){
            $.ajax({
                url: URL,
                dataType: 'json',
                type: 'GET',
            }).done(function(response) {
                var data = angular.fromJson(response);
                for (var g = 0; g < data.goalie.length; g++) {
                    var player = model.findPlayerByName(data.goalie[g].name);
                    if (player == null) {
                        var newPlayer = {
                            _id: (new Date).getTime(),
                            name: data.goalie[g].name,
                            position: data.goalie[g].position,
                            height: data.goalie[g].height,
                            weight: data.goalie[g].weight,
                            birthday: data.goalie[g].birthdate,
                            age: 25,
                            birthPlace: data.goalie[g].birthplace,
                            number: data.goalie[g].number
                        };
                        model.players.push(newPlayer);
                    }
                    else{
                        callback(null)
                    }
                }
                return callback(model.players)
            });
        }
    }
})();