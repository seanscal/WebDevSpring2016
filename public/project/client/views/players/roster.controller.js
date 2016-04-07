(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($scope, RosterService, GameService) {

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
                        //fetchContent();
                    }
                }
                else {
                    //fetchContent();
                }
            });
        }

        function fetchContent() {
            RosterService.fetchPlayers().then(function (response) {
                $scope.players = response;
            });

            RosterService.fetchStats().then(function (res) {
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

            var count = 0;

            GameService.getAllGames().then(function (response) {
                for (var x in response.data) {
                    if (response.data[x].status == "FINAL") {
                        fetchStats(response.data[x].gameId);
                    }
                }
            });
        }

        function fetchStats(gameId) {
            GameService.fetchGameStats(gameId).then(function (res) {
                var game = res;
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

                GameService.findGameById(res.data.gid).then(function (res) {
                    var side = res.data.loc;
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
                    addStats(stats, game);
                });
            });
        }

        function getHighlight(game, res, eventIngame) {
            if (eventIngame == "event") {
                var data = res.data.video.events;
            }
            else {
                var data = res.data.video.ingame;
            }
            for (var x in data) {
                if (data[x].type == 505) {
                    for (var y = 0; y < data[x].feeds.length; y++) {
                        var feed = {extId: data[x].feeds[y].extId};

                        if (data[x].feeds[y].videoSource) {
                            var newId = data[x].feeds[y].neulionId;
                            if (newId) {
                                var video = {
                                    html: "https://www.nhl.com/video/embed/t-279689874/c-" + newId + "?autostart=false"
                                };
                                var idFinder = feed.extId.split("-")[1];

                                GameService.updateGameHighlights(game.data.gid, video, idFinder)
                                    .then(function (res) {
                                        if (res.data.filledHighlights >= res.data.stats[0].goalSummary.length) {
                                            if (res.data) {
                                                var goals = res.data.stats[0].goalSummary;
                                                console.log("goals:");
                                                console.log(goals);
                                                RosterService.findPlayerByNumber(goals[goal].player1).then(function (res) {
                                                    if (res.data) {
                                                        console.log("adding highlight");
                                                        console.log(goals);
                                                        res.data.highlights = goals;
                                                        for (var goal in goals) {
                                                            if (goals[goal].team == "NJD") {
                                                                RosterService.addHighlights(res.data).then(function (res) {
                                                                    console.log("added highlight");
                                                                    console.log(res.data);
                                                                });
                                                            }
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                            }
                        }
                        else {
                            GameService.fetchHighlightStrings(game.data.gid, feed).then(function (res) {
                                if (res.data[0]) {
                                    var video = {
                                        html: res.data[0].publishPoint
                                    };
                                    var idFinder = res.data[0].id.split("-")[1];
                                    GameService.updateGameHighlights(game.data.gid, video, idFinder)
                                        .then(function (res) {
                                            if (res.data.filledHighlights >= res.data.stats[0].goalSummary.length) {
                                                if (res.data) {
                                                    var goals = res.data.stats[0].goalSummary;
                                                    console.log("goals:");
                                                    console.log(goals);
                                                    RosterService.findPlayerByNumber(goals[goal].player1).then(function (res) {
                                                        if (res.data) {
                                                            console.log("adding highlight");
                                                            console.log(goals);
                                                            res.data.highlights = goals;
                                                            for (var goal in goals) {
                                                                if (goals[goal].team == "NJD") {
                                                                    RosterService.addHighlights(res.data).then(function (res) {
                                                                        console.log("added highlight");
                                                                        console.log(res.data);
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                }
                            });
                        }
                    }
                }
            }
        }


        function addStats(stats, game) {
            GameService.addGameStats(stats).then(function (res) {
                    GameService.fetchHighlightIds(game.data.gid).then(function (res) {
                        console.log("fetching highlights");
                        console.log(res.data);
                        getHighlight(game, res, "event");
                        getHighlight(game, res, "ingame");
                    });
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