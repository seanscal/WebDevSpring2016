(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("PlayerController", PlayerController);

    function PlayerController($http, $rootScope, $scope, PlayerService) {
        $scope.players = [];
        $scope.addPlayer = addPlayer;
        $scope.updatePlayer = updatePlayer;
        $scope.deletePlayer = deletePlayer;
        $scope.selectPlayer = selectPlayer;
        $scope.fetchStats = fetchStats;


        function fetchStats() {
            PlayerService.fetchStats().then(function(response){
                $scope.players = response;
            });
        }
        fetchStats();

        function updatePlayer() {
            $scope.selectedPlayer.name = $scope.name;
            $scope.selectedPlayer.games = $scope.games;
            $scope.selectedPlayer.goals = $scope.goals;
            $scope.selectedPlayer.assists = $scope.assists;
            $scope.selectedPlayer.birthdate = $scope.birthdate;
            $scope.selectedPlayer.plusminus = $scope.plusminus;
            $scope.selectedPlayer.pim = $scope.pim;
            $scope.selectedPlayer.shots = $scope.shots;
            $scope.selectedPlayer.timeonice = $scope.timeonice;
            $scope.selectedPlayer.PP = $scope.PP;
            $scope.selectedPlayer.SH = $scope.SH;
            $scope.selectedPlayer.GWG = $scope.GWG;
            $scope.selectedPlayer.OT = $scope.OT;

            PlayerService.updatePlayer($scope.selectedPlayer._id, $scope.selectedPlayer).then(function(res){
                $scope.selectedPlayer = null;
                $scope.name = null;
                $scope.games = null;
                $scope.goals = null;
                $scope.assists = null;
                $scope.points = null;
                $scope.plusminus = null;
                $scope.pim = null;
                $scope.shots = null;
                $scope.timeonice = null;
                $scope.PP = null;
                $scope.SH = null;
                $scope.GWG = null;
                $scope.OT = null;
            });
        }

        function deletePlayer(index) {
            var player = $scope.players[index];
            RosterService.deletePlayerById(player._id).then(function (res) {
                RosterService.findAllPlayers().then(function(response){
                    $scope.players = response.data;
                })
            });
        }

        function selectPlayer(index) {
            $scope.selectedPlayer = $.extend(true, {}, PlayerService.players[index]);
            $scope.name = $scope.selectedPlayer.name;
            $scope.games = $scope.selectedPlayer.games;
            $scope.goals = $scope.selectedPlayer.goals;
            $scope.assists = $scope.selectedPlayer.assists;
            $scope.points = $scope.selectedPlayer.points;
            $scope.plusminus = $scope.selectedPlayer.plusminus;
            $scope.pim = $scope.selectedPlayer.pim;
            $scope.shots = $scope.selectedPlayer.pim;
            $scope.timeonice = $scope.selectedPlayer.timeonice;
            $scope.PP = $scope.selectedPlayer.PP;
            $scope.SH = $scope.selectedPlayer.SH;
            $scope.GWG = $scope.selectedPlayer.GWG;
            $scope.OT = $scope.selectedPlayer.OT;
        }
    }
})();