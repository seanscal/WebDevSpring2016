module.exports = function (mongoose) {
    var PlayerSchema = mongoose.Schema({


        updated: {type: Date, default: Date.now},
        _type: {type: String, default: "player"},
        name: String,
        height: String,
        weight: String,
        age: Number,
        birthPlace:String,
        number: String,
        pictureLink:String,
        position: String,
        birthday: String,
        playerId: Number,

        goals: {type: String, default: null},
        assists: {type: String, default: null},
        points: {type: String, default: null},
        shots: {type: String, default: null},
        timeonice: {type: String, default: null},
        PP: {type: String, default: null},
        SH: {type: String, default: null},
        GWG: {type: String, default: null},
        OT: {type: String, default: null},
        plusminus: {type: String, default: null},

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
        pim: {type: String, default: null}
    });
    return PlayerSchema;
};