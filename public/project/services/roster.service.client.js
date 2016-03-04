(function(){
    'use strict';

    angular
        .module("DevilsFanApp")
        .factory("RosterService", RosterService);

    function RosterService($rootScope) {
        var model = {
            players: [
                {	"_id":123, "name":"Joseph Blandisi",    "position":"L", "height":"6'0\"",   "weight": 200,
                    "birthday": "July 18, 1994",        "age": 21, "birthPlace":"Markham, ON, CAN",     "number": 64},

                {	"_id":234, "name":"Reid Boucher",       "position":"L", "height":"5'10\"",  "weight": 195,
                    "birthday": "September 8, 1993",    "age": 22, "birthPlace":"Lansing, MI, USA",     "number": 12},

                {	"_id":345, "name":"Michael Cammalleri", "position":"L", "height":"5'9\"",   "weight": 185,
                    "birthday": "June 8, 1982",         "age": 33, "birthPlace":"Toronto, ON, CAN",     "number": 13},

                {	"_id":456, "name":"Ryane Clowe",        "position":"L", "height":"6'3\"",   "weight": 225,
                    "birthday": "September 30, 1982",   "age": 33, "birthPlace":"St. John's, NL, CAN",  "number": 29},

                {	"_id":567, "name":"Patrik Elias",       "position":"C", "height":"6'1\"",   "weight": 190,
                    "birthday": "April 13, 1976",       "age": 39, "birthPlace":"Trebic, CZE",          "number": 26}
            ],
            setCurrentPlayer: setCurrentPlayer,
            getCurrentPlayer: getCurrentPlayer,
            findPlayerByPlayername: findPlayerByName,
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
    }
})();