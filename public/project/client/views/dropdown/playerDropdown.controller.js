(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("playerDropdownController", playerDropdownController);


    function playerDropdownController ($scope, $rootScope, DropDownService, RosterService) {

        $scope.players = [];
        $scope.fetchPlayers = fetchPlayers;

        $scope.dropboxitemselected = function (item) {
            DropDownService.dropdownitemselected(item);
        }

        function fetchPlayers(callback) {
            RosterService.fetchPlayers().then(function(response){
                $scope.players = response;
            });
        }
        fetchPlayers();
    }
})();