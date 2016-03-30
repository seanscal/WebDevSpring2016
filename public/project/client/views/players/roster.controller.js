(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($scope, $routeParams, RosterService, GameService) {

        $scope.players = [];
        $scope.deletePlayer = deletePlayer;
        $scope.fetchPlayers = fetchPlayers;
        $scope.setOrderProp = setOrderProp;
        $scope.printDate = printDate;

        rosterStart();

        function rosterStart() {
            RosterService.findAllPlayers().then(function (res) {
                $scope.players = res.data;
            });
            fetchPlayers();
        }

        function fetchPlayers() {
            RosterService.fetchPlayers().then(function (response) {
                $scope.players = response;
            });

            RosterService.fetchStats().then(function (res) {
                    var games = [];

                    for (var x = 10; x <= 12; x++) {
                        GameService.fetchGames(x, 2015).then(function (res) {
                            GameService.addGames(res.data.games).then(function (res) {
                                console.log("HEY");
                                console.log(res);
                            })
                        });
                    }

                    for (var y = 1; y <= 4; y++) {
                        GameService.fetchGames(y, 2016).then(function (res) {
                            GameService.addGames(res.data.games).then(function (res) {
                                console.log("HEY");
                                console.log(res);
                            })
                        });
                    }

                }
            );
        }

        function setOrderProp(prop) {
            $scope.orderProp = prop;
        }

        function deletePlayer(index) {
            var player = RosterService.players[index];
            RosterService.deletePlayerById(player._id).then(function (res) {
                RosterService.findAllPlayers().then(function (response) {
                    $scope.players = response.data;
                })
            });
        }

//format birthdays
        function padStr(i) {
            return (i < 10) ? "0" + i : "" + i;
        }

        function printDate(date) {
            date = new Date(date);
            var dateStr = padStr(1 + date.getMonth()) + '/' + padStr(date.getDate()) + '/' + padStr(date.getFullYear());
            return dateStr;
        }
    }
})
();