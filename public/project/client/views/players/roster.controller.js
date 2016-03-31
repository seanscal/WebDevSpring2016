(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($scope, $routeParams, RosterService, GameService) {

        $scope.players = [];
        $scope.deletePlayer = deletePlayer;
        $scope.setOrderProp = setOrderProp;
        $scope.printDate = printDate;

        rosterLoad();

        function rosterLoad() {
            RosterService.findAllPlayers().then(function (res) {
                $scope.players = res.data;

                //TODO: DELETE THIS BEFORE FINAL
                fetchContent();


                // update content if it's been more than 30 minutes since the last update
                if ($scope.players[0]) {
                    if (Math.abs(Date.now() - new Date($scope.players[0].updated)) > 1800000) {
                        fetchContent();
                    }
                }
                else {
                    fetchContent();
                }
            });


        }

        function fetchContent() {
            RosterService.fetchPlayers().then(function (response) {
                $scope.players = response;
            });

            RosterService.fetchStats().then(function (res) {
                var games = [];

                for (var x = 10; x <= 12; x++) {
                    GameService.fetchGames(x, 2015).then(function (res) {
                        GameService.addGames(res.data.games).then(function (res) {
                        })
                    });
                }

                for (var y = 1; y <= 4; y++) {
                    GameService.fetchGames(y, 2016).then(function (res) {
                        GameService.addGames(res.data.games).then(function (res) {
                        });
                    });
                }
            });

            GameService.getAllGames().then(function (response) {
                for (var x in response.data) {
                    if (response.data[x].status == "FINAL") {
                        GameService.fetchGameStats(response.data[x].gameId).then(function (res) {
                            var game = res;
                            var side = "home";
                            var stats = {
                                gameId: game.data.gid,
                                players: [],
                                goals: [],
                                penalties: []
                            };
                            for (var x in res.data.goalSummary) {
                                for (var y in res.data.goalSummary[x].goals) {
                                    stats.goals.push(res.data.goalSummary[x].goals[y]);
                                }
                            }

                            for (var i in res.data.penaltySummary) {
                                for (var j in res.data.penaltySummary[i].penalties) {
                                    stats.penalties.push(res.data.penaltySummary[i].penalties[j]);
                                }
                            }

                            console.log(res.data);


                            GameService.findGameById(res.data.gid).then(function (res) {
                                side = res.data.loc;
                                if (side == "home") {
                                    for (var s in game.data.rosters.home.skaters) {
                                        stats.players.push(game.data.rosters.home.skaters[s]);
                                    }
                                    for (var g in game.data.rosters.home.goalies) {
                                        stats.players.push(game.data.rosters.home.goalies[g]);
                                    }
                                }
                                else {
                                    for (var s in game.data.rosters.away.skaters) {
                                        stats.players.push(game.data.rosters.away.skaters[s]);
                                    }
                                    for (var g in game.data.rosters.away.goalies) {
                                        stats.players.push(game.data.rosters.away.goalies[g]);
                                    }
                                }
                                GameService.addGameStats(stats).then(function (res) {
                                    //console.log(res);
                                });
                            });
                        });
                    }
                }
            });
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