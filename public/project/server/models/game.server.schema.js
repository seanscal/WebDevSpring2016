module.exports = function(mongoose, GameStats) {
    var GameSchema = mongoose.Schema({
        gameId: Number,
        status: {type: String, default: null},
        cPeriod: {type: String, default: ""},
        startTime: {type: String, default: ""},
        loc: {type: String, default: "home"},
        score: {type: String, default: null},
        abb: {type: String, default: null},
        stats: {type: [GameStats], default: null},
        filledHighlights: {type: Number, default: 0},
        story: {type: String, default: null},
        storyTitle: {type: String, default: null},
        keywords:{type:[String], default: []},
        playerNameArray: {type:String, default: []}
    });
    return GameSchema;
};