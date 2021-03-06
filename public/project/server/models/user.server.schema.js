module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        firstName: {type: String, default: "User"},
        lastName: {type: String, default: "Name"},
        username: String,
        password: String,
        emails: {type: [String], default: []},
        roles: {type: [String], default: ["fan"]},
        favoritePlayer: {type: String, default: "Patrik Elias"}
    });
    return UserSchema;
};