(function(){
    angular
        .module("DevilsFanApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $location, $scope, RosterService, GameService) {
        $rootScope.$location = $location;
        $rootScope.currentUser = null;
        $rootScope.favoritePlayer = "None";

        $scope.players = [];

        rosterLoad();

        function rosterLoad() {
            RosterService.findAllPlayers().then(function (res) {
                $scope.players = res.data;

                // update content if it's been more than 30 minutes since the last update
                if ($scope.players[0]) {
                    if (Math.abs(Date.now() - new Date($scope.players[0].updated)) > 1800000) {
                        fetchContent();
                    }
                }
                else {
                    for (var x = 0; x < 3; x++){
                        fetchContent();
                    }
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
                        console.log("fetched games");
                        GameService.addGames(res.data.games).then(function (res) {
                            console.log("added games");
                        })
                    });
                }

                for (var y = 1; y <= 4; y++) {
                    GameService.fetchGames(y, 2016).then(function (res) {
                        console.log("fetched games");
                        console.log(res.data.games);
                        GameService.addGames(res.data.games).then(function (res) {
                            console.log("added games");
                        });
                    });
                }
            });

            var count = 0;

            GameService.getAllGames().then(function (response) {
                console.log("got all games");
                for (var x in response.data) {
                    if (response.data[x].status == "FINAL") {
                        fetchStats(response.data[x].gameId);
                    }
                }
            });
        }

        function fetchStats(gameId) {
            GameService.fetchGameStats(gameId).then(function (res) {
                console.log("fetched game stats");
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
                    console.log("found game id");
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
                    if (!res.data.stats[0]) {
                        addStats(stats, game);
                    }
                    else if (res.data.filledHighlights < res.data.stats[0].goalSummary.length-1) {
                        addStats(stats, game);
                    }
                });
            });
        }

        function getHighlight(game, res, eventIngame) {
            console.log("getting highlights");
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
                                console.log("to add highlights");

                                addHighlights(game.data.gid, video, idFinder)
                            }
                        }
                        else {
                            console.log("fetching strings");
                            GameService.fetchHighlightStrings(game.data.gid, feed).then(function (res) {
                                console.log("fetched strings");
                                if (res.data[0]) {
                                    var video = {
                                        html: res.data[0].publishPoint
                                    };
                                    var idFinder = res.data[0].id.split("-")[1];
                                    addHighlights(game.data.gid, video, idFinder)
                                }
                            });
                        }
                    }
                }
            }
        }


        function addStats(stats, game) {
            console.log("adding stats");
            GameService.addGameStats(stats).then(function (res) {
                console.log("added stats");
                GameService.fetchHighlightIds(game.data.gid).then(function (res) {
                    console.log("fetched highlight ids");
                    getHighlight(game, res, "event");
                    getHighlight(game, res, "ingame");
                });
            });
        }

        function addHighlights(gameId, video, goalId) {
            console.log("update highlights");
            GameService.updateGameHighlights(gameId, video, goalId)
                .then(function (res) {
                    console.log("updated highlights");
                    if (res.data) {
                        //TODO: make this "attempts" attribute on games, give it (3-5) tries to find the highlight
                        if (res.data.filledHighlights >= res.data.stats[0].goalSummary.length-1) {
                            var goals = res.data.stats[0].goalSummary;
                            for (var goal in goals) {
                                if (goals[goal].team == "NJD") {
                                    RosterService.findPlayerByNumber(goals[goal].player1).then(function (res) {
                                        if (res.data) {
                                            for (var goal in goals) {
                                                if (goals[goal].team == "NJD" && goals[goal].player1 == res.data.number) {
                                                    if (!res.data.highlights){
                                                        res.data.highlights = [];
                                                    }
                                                    res.data.highlights.push(goals[goal]);
                                                }
                                            }
                                            console.log("adding player highlights");
                                            RosterService.addHighlights(res.data).then(function (res) {
                                                console.log("added player highlights");
                                                console.log(res.data);
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    }
                });
        }

        //$sceDelegateProvider.resourceUrlWhitelist(['**']);
    }
})();


angular.module('DevilsFanApp').config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['**']);
});



