module.exports = function (mongoose, Goal) {
    var PlayerSchema = mongoose.Schema({

        updated: {type: Date, default: Date.now},
        _type: {type: String, default: "player"},
        name: String,
        height: String,
        weight: String,
        age: Number,
        birthPlace:String,
        number: Number,
        pictureLink:String,
        position: String,
        birthday: String,
        playerId: Number,

        goals: {type: String, default: 0},
        assists: {type: String, default: 0},
        points: {type: String, default: 0},
        shots: {type: String, default: 0},
        timeonice: {type: String, default: 0},
        PP: {type: String, default: 0},
        SH: {type: String, default: 0},
        GWG: {type: String, default: 0},
        OT: {type: String, default: 0},
        plusminus: {type: String, default: 0},

        wins: {type: String, default: null},
        losses: {type: String, default: null},
        overtimeLosses: {type: String, default: null},
        goalsAgainst: {type: String, default: null},
        shotsAgainst: {type: String, default: null},
        saves: {type: String, default: null},
        savePercentage: {type: String, default: null},
        GAA: {type: String, default: null},
        shutouts: {type: String, default: null},
        minutes: {type: String, default: null},

        games: {type: String, default: null},
        pim: {type: String, default: null},

        highlights: {type: [Goal], default: []}
    });
    return PlayerSchema;
};