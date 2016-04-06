var q = require("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
    var GoalSchema = require("./goals.server.schema.js")(mongoose);
    var PenaltiesSchema = require("./penalties.server.schema.js")(mongoose);
    var PlayersSchema = require("./gamePlayers.server.schema.js")(mongoose);
    var GameStatsSchema = require("./gameStats.server.schema.js")(mongoose, GoalSchema, PenaltiesSchema, PlayersSchema);
    var GameSchema = require("./game.server.schema.js")(mongoose, GameStatsSchema);
    var Game = mongoose.model("Game", GameSchema);


    var api = {
        createGame: createGame,
        findGameById: findGameById,
        updateGame: updateGame,
        deleteGame: deleteGame,
        findAllGames: findAllGames,
        addGames: addGames,
        addStats: addStats,
        updateGameHighlights: updateGameHighlights
    };
    return api;

    function createGame(game) {
        var newGame = new Game({
            gameId: game.gameId,
            status: game.status,
            cPeriod: game.cPeriod,
            startTime: game.startTime,
            loc: game.loc,
            score: game.score,
            abb: game.abb
        });

        var deferred = q.defer();
        findGameById(game.gameId).then(function (game) {
            if (!game && (newGame.gameId > 2015019999) && (newGame.gameId < 2015029999)) {
                Game.create(newGame, function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(doc);
                    }
                });
            }
            else {
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }

    function findGameById(gameId) {
        var deferred = q.defer();
        Game.findOne(
            {
                gameId: gameId
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findAllGames() {
        var deferred = q.defer();
        Game.find(function (err, games) {
            deferred.resolve(games);
        });
        return deferred.promise;
    }

    function updateGame(gameId, game) {
        var deferred = q.defer();
        delete game._id;
        Game.update({gameId: gameId}, game, function (err, response) {
            findGameById(gameId).then(function (game) {
                deferred.resolve(game);
            });
        });
        return deferred.promise;
    }

    function deleteGame(gameId) {
        var deferred = q.defer();
        Game.remove({_id: gameId}, function (err, response) {
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    function addGames(games) {
        var deferred = q.defer();
        for (var i = 0; i < games.length; i++) {
            createGame(games[i]).then(function (game) {
                deferred.resolve(game);
            });
        }
        return deferred.promise;
    }

    function updateGameHighlights(gameId, videoId, video) {
        var deferred = q.defer();
        var found = false;
        findGameById(gameId).then(function (game) {
            for (var x in game.stats[0].goalSummary) {
                if (parseInt(game.stats[0].goalSummary[x].goalId) == videoId) {
                    found = true;
                    game.stats[0].goalSummary[x].highlight.push(video.html);
                    updateGame(gameId, game);
                    deferred.resolve(game.stats[0].goalSummary[x]);
                }
            }
            if (found == false) {
                deferred.resolve(null);
            }
        });
        return deferred.promise;
    }

    function addStats(stats, gameId) {
        var deferred = q.defer();
        findGameById(gameId).then(function (game) {
            if (game.stats[0] == null && game.status == "FINAL") {
                var correctedStats = {
                    roster: [],
                    penaltySummary: [],
                    goalSummary: []
                };

                for (var x in stats.players) {
                    var p = stats.players[x];
                    var newPlayer = {
                        goals: p.g,
                        assists: p.a,
                        number: p.num,
                        toi: p.toi,
                        shots: p.sog,
                        pim: p.pim,
                        plusminus: p.pm,
                        shotsagainst: p.sa,
                        saves: p.sv,
                        savepercentage: p.svp,
                        goalsagainst: p.ga
                    };
                    correctedStats.roster.push(newPlayer);
                }

                for (var y in stats.goals) {
                    var g = stats.goals[y];
                    var newGoal = {
                        description: g.desc,
                        player1: g.p1,
                        player2: g.pa,
                        player3: g.sa,
                        player1total: g.p1t,
                        player2total: g.p2t,
                        player3total: g.p3t,
                        period: g.p,
                        goalId: g.id,
                        team: g.t1
                    };
                    correctedStats.goalSummary.push(newGoal);
                }

                for (var z in stats.penalties) {
                    var pen = stats.penalties[z];
                    var newPenalty = {
                        description: pen.desc,
                        period: pen.p,
                        player1: pen.p1,
                        player2: pen.p2
                    };
                    correctedStats.penaltySummary.push(newPenalty);
                }

                game.stats = correctedStats;
                Game.update({gameId: gameId}, game, function (err, response) {
                    findGameById(gameId).then(function (game) {
                        deferred.resolve(game);
                    });
                });
            }
            else {
                deferred.resolve(null);
            }
        });

        return deferred.promise;
    }
};