module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        emails: {type: [String], default: []},
        phones: {type: [String], default: []}
    });
    return UserSchema;
};