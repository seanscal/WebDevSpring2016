var q = require("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
    var GameSchema = require("./game.server.schema.js")(mongoose);
    var Game = mongoose.model("Game", GameSchema);

    var api = {
        createGame: createGame,
        findGameById: findGameById,
        updateGame: updateGame,
        deleteGame: deleteGame,
        findAllGames: findAllGames,
        addGames: addGames
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
        Game.update({_id: gameId}, game, function (err, response) {
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
};