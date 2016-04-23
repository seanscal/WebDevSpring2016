module.exports = function(mongoose, Goals, Penalties, Players) {
    var GameStatsSchema = mongoose.Schema({
        goalSummary: {type: [Goals], default: null},
        penaltySummary: {type: [Penalties], default: null},
        roster: {type: [Players], default: null},
    });
    return GameStatsSchema;
};