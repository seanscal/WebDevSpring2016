module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        firstName: {type: String, default: "User"},
        lastName: {type: String, default: "Name"},
        username: String,
        password: String,
        emails: {type: [String], default: []},
        phones: {type: [String], default: []}
    });
    return UserSchema;
};