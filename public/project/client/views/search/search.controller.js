//TODO: STYLE SEARCH


(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, RosterService, GameService) {
        // Initialize the scope defaults.
        $scope.players = [];
        $scope.games  = []; // An array of players results to display
        $scope.resultsHidden = true;

        $scope.fetchItems = fetchItems;
        $scope.search = search;

        function fetchItems() {
            RosterService.fetchPlayers().then(function (response) {
                $scope.players = response;
                GameService.getAllGames().then(function (response) {
                    $scope.games = response.data;
                });
            });

        }
        fetchItems();

        function search(){
            $scope.filterPlayers = $scope.searchedPlayers;
            $scope.filterGames = $scope.searchedGames;
            $scope.resultsHidden = false;
        }

        $scope.searchedPlayers = function(player){
            if (!$scope.searchTerm || (player.number == $scope.searchTerm || (player.name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) != -1))){
                return true;
            }
            return false;
        };

        $scope.searchedGames = function(game){
            for (var x = 0; x < game.keywords.length; x++){
                console.log(game.keywords[x]);
                if ($scope.searchTerm == game.keywords[x]){
                    return true;
                }
            }
            return game.abb.toLowerCase() == $scope.searchTerm || game.abb ==$scope.searchTerm;
        };


    }
})();

//        function fetchItems() {
//            RosterService.fetchPlayers().then(function (response) {
//                $scope.players = response;
//            });
//            GameService.getAllGames().then(function (response) {
//                $scope.games = response;
//            });
//        }
//        fetchItems();
//
//        function search(){
//            $scope.filterPlayers = $scope.searchedPlayers;
//            $scope.filterGames = $scope.searchedGames;
//            $scope.resultsHidden = false;
//        }
//
//        $scope.searchedPlayers = function(player){
//            if (!$scope.searchTerm || (player.number == $scope.searchTerm || (player.name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) != -1))){
//                return true;
//            }
//            return false;
//        };
//
//        $scope.searchedGames = function(game){
//            for (var x = 0; x < game.keywords.length; x++){
//                console.log(game.keywords[x]);
//                if ($scope.searchTerm == game.keywords[x]){
//                    return true;
//                }
//            }
//            return game.abb == $scope.searchTerm;
//        };
//
//
//    }
//})();