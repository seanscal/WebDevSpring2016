(function () {
    'use strict';

    angular
        .module("DevilsFanApp")
        .factory("GameService", GameService);

    function GameService($http) {
        var model = {
            games: [],
            fetchGames: fetchGames,
            addGames: addGames
        };
        return model;

        function fetchGames(month, year) {
            return $http.get('/api/project/' + month + '/' + year + '/basicGameInfo')
                .then(function (res) {
                    return res;
                });
        }

        function addGames(games) {
            return $http.post("/api/project/games", games)
                .then(function (res) {
                    console.log(res);
                    return res;
                });
        }
    }
}());