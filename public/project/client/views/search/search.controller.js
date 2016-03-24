(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("SearchController", SearchController);

    function SearchController($scope, RosterService, uppercaseFilter, filterFilter) {
        // Initialize the scope defaults.
        $scope.players = [];        // An array of players results to display
        $scope.resultsHidden = true;

        $scope.fetchPlayers = fetchPlayers;
        $scope.search = search;

        function fetchPlayers() {
            RosterService.fetchPlayers().then(function (response) {
                $scope.players = response;
            });
        }
        fetchPlayers();

        $scope.myFilter = function (player) {
            var found = [];
            for(player in players) {
                if (player.name === $scope.searchTerm || player.number === $scope.searchTerm){
                    found.push(player);
                }
            }
            return found;
        };

        function search(){
            $scope.filterPlayers = $scope.searchedPlayers;
            $scope.resultsHidden = false;
        }

        $scope.searchedPlayers = function(player){
            if (!$scope.searchTerm || (player.number == $scope.searchTerm || (player.name.toLowerCase().indexOf($scope.searchTerm.toLowerCase()) != -1))){
                return true;
            }
            return false;
        };


    }
})();