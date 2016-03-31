module.exports = function(mongoose) {
    var GamePlayersSchema = mongoose.Schema({
        goals: {type: Number, default: null},
        shots: {type: Number, default: null},
        number: Number,
        pim: {type: Number, default: null},
        toi: {type: String, default: null},
        assists: {type: Number, default: null},
        plusminus: {type: Number, default: null},
        shotsagainst: {type: Number, default: null},
        saves: {type: Number, default: null},
        savepercentage: {type: String, default: null},
        goalsagainst: {type: Number, default: null},
        highlight: {type: [String], default: null}
    });
    return GamePlayersSchema;
};