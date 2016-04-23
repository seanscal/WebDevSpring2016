module.exports = function(mongoose) {
    var GoalsSchema = mongoose.Schema({
        description: String,
        player1: Number,
        player2: {type: Number, default: null},
        player3: {type: Number, default: null},
        player1total: {type: Number, default: 1},
        player2total: {type: Number, default: null},
        player3total: {type: Number, default: null},
        period: {type: Number, default: null},
        highlight: {type: [String], default: []},
        goalId: {type: String, default: null},
        team: {type: String, default: "NJD"},
        topFive: {type: Boolean, default: false}
    });
    return GoalsSchema;
};