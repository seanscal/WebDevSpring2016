(function () {
    'use strict';

    angular
        .module("DevilsFanApp")
        .factory("GameService", GameService);

    function GameService($http) {
        var model = {
            games: [],
            fetchGames: fetchGames,
            addGames: addGames,
            fetchGameStats: fetchGameStats,
            findGameById: findGameById,
            getAllGames: getAllGames,
            addGameStats: addGameStats

        };
        return model;

        function addGames(games) {
            return $http.post("/api/project/games", games);
        }

        function findGameById(gameId) {
            return $http.get("/api/project/game/" + gameId);
        }

        function getAllGames(){
            return $http.get("/api/project/game/");
        }

        function fetchGames(month, year) {
            return $http.get('/api/project/' + month + '/' + year + '/basicGameInfo')
                .then(function (res) {
                    return res;
                });
        }

        function fetchGameStats(gameId) {
            return $http.get('/api/project/' + gameId + '/gameStats')
                .then(function (res) {
                    return res;
                });
        }

        function addGameStats(stats) {
            console.log("Client Service Add Game Stats")
            return $http.put("/api/project/game/"+stats.gameId+"/stats", stats);
        }
    }
}());