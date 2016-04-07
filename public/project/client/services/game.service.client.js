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
            addGameStats: addGameStats,
            fetchHighlightIds: fetchHighlightIds,
            fetchHighlightStrings: fetchHighlightStrings,
            updateGameHighlights: updateGameHighlights

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
            console.log(stats);
            return $http.put("/api/project/game/"+stats.gameId+"/stats", stats);
        }

        function fetchHighlightIds(gameId) {
            return $http.get('/api/project/' + gameId + '/highlightId')
                .then(function (res) {
                    return res;
                });
        }

        function fetchHighlightStrings(gameId, feed){
            return $http.post('/api/project/' + gameId + '/highlightString', feed)
                .then(function (res) {
                    return res;
                });
        }

        function updateGameHighlights(gameId, video, goalId){
            return $http.post('/api/project/' + gameId + '/video/' + goalId, video)
                .then(function (res) {
                    return res;
                });
        }
    }
}());