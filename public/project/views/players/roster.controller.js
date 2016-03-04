(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($rootScope, $scope, RosterService){
        $scope.players = RosterService.players;

        $scope.addPlayer = addPlayer;
        $scope.updatePlayer = updatePlayer;
        $scope.deletePlayer = deletePlayer;
        $scope.selectPlayer = selectPlayer;

        function addPlayer() {
            RosterService.createPlayerForUser($rootScope.currentUser._id, { title: $scope.playerTitle }, callback);

            function callback(player) {
                $scope.playerTitle = null;
            }
        }

        function updatePlayer() {
            $scope.selectedPlayer.title = $scope.playerTitle;
            RosterService.updatePlayerById($scope.selectedPlayer._id, $scope.selectedPlayer, callback);

            function callback(player) {
                $scope.selectedPlayer = null;
                $scope.playerTitle = null;
            }
        }

        function deletePlayer(index) {
            RosterService.deletePlayerById(RosterService.players[index]._id, callback);

            function callback() {
            }
        }

        function selectPlayer(index) {
            $scope.selectedPlayer = $.extend(true, {}, RosterService.players[index]);
            $scope.playerTitle = $scope.selectedPlayer.title;
        }
    }
})();