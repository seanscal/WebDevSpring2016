module.exports = function(mongoose) {
    var PenaltiesSchema = mongoose.Schema({
        description: String,
        period: Number,
        player1: {type: Number, default: null},
        player2: {type: Number, default: null},
    });
    return PenaltiesSchema;
};