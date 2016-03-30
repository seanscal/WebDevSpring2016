(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($scope, $routeParams, RosterService) {

        $scope.players = [];
        $scope.addPlayer = addPlayer;
        $scope.updatePlayer = updatePlayer;
        $scope.deletePlayer = deletePlayer;
        $scope.selectPlayer = selectPlayer;
        $scope.fetchPlayers = fetchPlayers;
        $scope.setOrderProp = setOrderProp;
        $scope.printDate = printDate;


        function fetchPlayers() {
            RosterService.fetchPlayers().then(function (response) {
                $scope.players = response;
                RosterService.fetchStats().then(function(res){
                });
            });
        }

        function setOrderProp(prop){
            $scope.orderProp = prop;
        }

        if ($routeParams.id){

            RosterService.findPlayerById($routeParams.id).then(function(res){
                console.log(res.data);
                $scope.currentPlayer = res.data;
                console.log($scope.currentPlayer);
            });
        }
        else {
            RosterService.findAllPlayers().then(function(res){
                    $scope.players = res.data;
                });
            fetchPlayers();
        }

        function addPlayer() {
            RosterService.createPlayer({
                number: $scope.number, name: $scope.name, position: $scope.position, height: $scope.height,
                weight: $scope.weight, birthday: $scope.birthday, age: $scope.age, birthPlace: $scope.birthPlace,
                games: $scope.games, goals: $scope.goals, assists: $scope.assists,
                points: $scope.points, plusminus: $scope.plusminus, pim: $scope.pim,
                shots: $scope.shots, timeonice: $scope.timeonice, PP: $scope.PP, SH: $scope.SH, GWG: $scope.GWG,
                OT: $scope.OT
            }).then(function (res) {
                $scope.number = null;
                $scope.name = null;
                $scope.position = null;
                $scope.height = null;
                $scope.weight = null;
                $scope.birthday = null;
                $scope.age = null;
                $scope.birthPlace = null;
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

        function updatePlayer(index) {
            $scope.selectedPlayer.number = $scope.number;
            $scope.selectedPlayer.name = $scope.name;
            $scope.selectedPlayer.position = $scope.position;
            $scope.selectedPlayer.height = $scope.height;
            $scope.selectedPlayer.weight = $scope.weight;
            $scope.selectedPlayer.birthdate = $scope.birthdate;
            $scope.selectedPlayer.age = $scope.age;
            $scope.selectedPlayer.birthPlace = $scope.birthPlace;
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

            RosterService.updatePlayer($scope.selectedPlayer).then(function (res) {
                RosterService.players[index] = res.data;
                RosterService.findAllPlayers().then(function(response){
                    $scope.players = response.data;
                });
                $scope.selectedPlayer = null;
                $scope.number = null;
                $scope.name = null;
                $scope.position = null;
                $scope.height = null;
                $scope.weight = null;
                $scope.birthday = null;
                $scope.age = null;
                $scope.birthPlace = null;
                $scope.name = null;
                $scope.games = null;
                $scope.goals = null;
                $scope.assists = null;
                $scope.birthdate = null;
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
            var player = RosterService.players[index];
            RosterService.deletePlayerById(player._id).then(function (res) {
                RosterService.findAllPlayers().then(function(response){
                    $scope.players = response.data;
                })
            });
        }

        function selectPlayer(index) {
            $scope.selectedPlayer = RosterService.players[index];
            $scope.number = $scope.selectedPlayer.number;
            $scope.name = $scope.selectedPlayer.name;
            $scope.position = $scope.selectedPlayer.position;
            $scope.height = $scope.selectedPlayer.height;
            $scope.weight = $scope.selectedPlayer.weight;
            $scope.birthday = $scope.selectedPlayer.birthday;
            $scope.age = $scope.selectedPlayer.age;
            $scope.birthPlace = $scope.selectedPlayer.birthPlace;
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
            $scope.OT = $scope= $scope.selectedPlayer.OT;
        }


        function padStr(i) {
            return (i < 10) ? "0" + i : "" + i;
        }

        function printDate(date) {
            date = new Date(date);
            var dateStr = padStr(1+date.getMonth()) + '/' + padStr(date.getDate())  + '/'+ padStr(date.getFullYear());
            return dateStr;
        }
    }
})();