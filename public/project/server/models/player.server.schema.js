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

        wins: {type: String, default: 0},
        losses: {type: String, default: 0},
        overtimeLosses: {type: String, default: 0},
        goalsAgainst: {type: String, default: 0},
        shotsAgainst: {type: String, default: 0},
        saves: {type: String, default: 0},
        savePercentage: {type: String, default:".000"},
        GAA: {type: String, default: "0.00"},
        shutouts: {type: String, default: 0},
        minutes: {type: String, default: 0},

        games: {type: String, default: 0},
        pim: {type: String, default: 0},

        highlights: {type: [Goal], default: []},
        topFive: {type: [Goal], default: []}
    });
    return PlayerSchema;
};