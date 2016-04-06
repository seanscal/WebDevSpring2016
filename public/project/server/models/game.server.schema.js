module.exports = function(mongoose, GameStats) {
    var GameSchema = mongoose.Schema({
        gameId: Number,
        status: {type: String, default: null},
        cPeriod: {type: String, default: ""},
        startTime: {type: String, default: ""},
        loc: {type: String, default: "home"},
        score: {type: String, default: null},
        abb: {type: String, default: null},
        stats: {type: [GameStats], default: null}
    });
    return GameSchema;
};