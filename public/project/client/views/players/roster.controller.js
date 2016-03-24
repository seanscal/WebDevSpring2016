(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($routeParams, RosterService) {
        var vm = this;
        vm.players = [];
        vm.addPlayer = addPlayer;
        vm.updatePlayer = updatePlayer;
        vm.deletePlayer = deletePlayer;
        vm.selectPlayer = selectPlayer;
        vm.fetchPlayers = fetchPlayers;



        function fetchPlayers() {
            RosterService.fetchPlayers().then(function (response) {
                vm.players = response;
            });
        }

        if ($routeParams.id){

        }
        else {

            fetchPlayers();
        }

        function addPlayer() {
            RosterService.createPlayer({
                number: vm.number, name: vm.name, position: vm.position, height: vm.height,
                weight: vm.weight, birthday: vm.birthday, age: vm.age, birthPlace: vm.birthPlace,
                games: vm.games, goals: vm.goals, assists: vm.assists,
                points: vm.points, plusminus: vm.plusminus, pim: vm.pim,
                shots: vm.shots, timeonice: vm.timeonice, PP: vm.PP, SH: vm.SH, GWG: vm.GWG,
                OT: vm.OT
            }).then(function (res) {
                vm.number = null;
                vm.name = null;
                vm.position = null;
                vm.height = null;
                vm.weight = null;
                vm.birthday = null;
                vm.age = null;
                vm.birthPlace = null;
                vm.selectedPlayer = null;
                vm.name = null;
                vm.games = null;
                vm.goals = null;
                vm.assists = null;
                vm.points = null;
                vm.plusminus = null;
                vm.pim = null;
                vm.shots = null;
                vm.timeonice = null;
                vm.PP = null;
                vm.SH = null;
                vm.GWG = null;
                vm.OT = null;
            });
        }

        function updatePlayer(index) {
            vm.selectedPlayer.number = vm.number;
            vm.selectedPlayer.name = vm.name;
            vm.selectedPlayer.position = vm.position;
            vm.selectedPlayer.height = vm.height;
            vm.selectedPlayer.weight = vm.weight;
            vm.selectedPlayer.birthdate = vm.birthdate;
            vm.selectedPlayer.age = vm.age;
            vm.selectedPlayer.birthPlace = vm.birthPlace;
            vm.selectedPlayer.name = vm.name;
            vm.selectedPlayer.games = vm.games;
            vm.selectedPlayer.goals = vm.goals;
            vm.selectedPlayer.assists = vm.assists;
            vm.selectedPlayer.birthdate = vm.birthdate;
            vm.selectedPlayer.plusminus = vm.plusminus;
            vm.selectedPlayer.pim = vm.pim;
            vm.selectedPlayer.shots = vm.shots;
            vm.selectedPlayer.timeonice = vm.timeonice;
            vm.selectedPlayer.PP = vm.PP;
            vm.selectedPlayer.SH = vm.SH;
            vm.selectedPlayer.GWG = vm.GWG;
            vm.selectedPlayer.OT = vm.OT;

            RosterService.updatePlayer(vm.selectedPlayer).then(function (res) {
                RosterService.players[index] = res.data;
                console.log(RosterService.players[index]);
                RosterService.findAllPlayers().then(function(response){
                    vm.players = response.data;
                });
                vm.selectedPlayer = null;
                vm.number = null;
                vm.name = null;
                vm.position = null;
                vm.height = null;
                vm.weight = null;
                vm.birthday = null;
                vm.age = null;
                vm.birthPlace = null;
                vm.name = null;
                vm.games = null;
                vm.goals = null;
                vm.assists = null;
                vm.birthdate = null;
                vm.plusminus = null;
                vm.pim = null;
                vm.shots = null;
                vm.timeonice = null;
                vm.PP = null;
                vm.SH = null;
                vm.GWG = null;
                vm.OT = null;
            });
        }

        function deletePlayer(index) {
            var player = vm.players[index];
            RosterService.deletePlayerById(player._id).then(function (res) {
                RosterService.findAllPlayers().then(function(response){
                    vm.players = response.data;
                })
            });
        }

        function selectPlayer(index) {
            vm.selectedPlayer = RosterService.players[index];
            vm.number = vm.selectedPlayer.number;
            vm.name = vm.selectedPlayer.name;
            vm.position = vm.selectedPlayer.position;
            vm.height = vm.selectedPlayer.height;
            vm.weight = vm.selectedPlayer.weight;
            vm.birthday = vm.selectedPlayer.birthday;
            vm.age = vm.selectedPlayer.age;
            vm.birthPlace = vm.selectedPlayer.birthPlace;
            vm.name = vm.selectedPlayer.name;
            vm.games = vm.selectedPlayer.games;
            vm.goals = vm.selectedPlayer.goals;
            vm.assists = vm.selectedPlayer.assists;
            vm.points = vm.selectedPlayer.points;
            vm.plusminus = vm.selectedPlayer.plusminus;
            vm.pim = vm.selectedPlayer.pim;
            vm.shots = vm.selectedPlayer.pim;
            vm.timeonice = vm.selectedPlayer.timeonice;
            vm.PP = vm.selectedPlayer.PP;
            vm.SH = vm.selectedPlayer.SH;
            vm.GWG = vm.selectedPlayer.GWG;
            vm.OT = vm= vm.selectedPlayer.OT;
        }
    }
})();