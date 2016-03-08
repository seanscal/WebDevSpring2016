(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($rootScope, $scope, RosterService) {
        $scope.players = [];
        $scope.addPlayer = addPlayer;
        $scope.updatePlayer = updatePlayer;
        $scope.deletePlayer = deletePlayer;
        $scope.selectPlayer = selectPlayer;
        $scope.fetchPlayers = fetchPlayers;


        function fetchStats(callback) {
            PlayerService.fetchStats().then(function(response){
                $scope.player = response;
            });
        }
        fetchPlayers();

        function addPlayer() {
            RosterService.createPlayer({
                    number: $scope.number, name: $scope.name, position: $scope.position, height: $scope.height,
                    weight: $scope.weight, birthday: $scope.birthday, age: $scope.age, birthPlace: $scope.birthPlace
                },
                callback);

            function callback(player) {
                $scope.number = null;
                $scope.name = null;
                $scope.position = null;
                $scope.height = null;
                $scope.weight = null;
                $scope.birthday = null;
                $scope.age = null;
                $scope.birthPlace = null;
            }
        }

        function updatePlayer() {
            $scope.selectedPlayer.number = $scope.number;
            $scope.selectedPlayer.name = $scope.name;
            $scope.selectedPlayer.position = $scope.position;
            $scope.selectedPlayer.height = $scope.height;
            $scope.selectedPlayer.weight = $scope.weight;
            $scope.selectedPlayer.birthdate = $scope.birthdate;
            $scope.selectedPlayer.age = $scope.age;
            $scope.selectedPlayer.birthPlace = $scope.birthPlace;

            RosterService.updatePlayer($scope.selectedPlayer._id, $scope.selectedPlayer, callback);

            function callback(player) {
                $scope.selectedPlayer = null;
                $scope.number = null;
                $scope.name = null;
                $scope.position = null;
                $scope.height = null;
                $scope.weight = null;
                $scope.birthday = null;
                $scope.age = null;
                $scope.birthPlace = null;
            }
        }

        function deletePlayer(index) {
            RosterService.deletePlayerById(RosterService.players[index]._id, callback);

            function callback() {
            }
        }

        function selectPlayer(index) {
            $scope.selectedPlayer = $.extend(true, {}, RosterService.players[index]);
            $scope.number = $scope.selectedPlayer.number;
            $scope.name = $scope.selectedPlayer.name;
            $scope.position = $scope.selectedPlayer.position;
            $scope.height = $scope.selectedPlayer.height;
            $scope.weight = $scope.selectedPlayer.weight;
            $scope.birthday = $scope.selectedPlayer.birthday;
            $scope.age = $scope.selectedPlayer.age;
            $scope.birthPlace = $scope.selectedPlayer.birthPlace;
        }
    }
})();