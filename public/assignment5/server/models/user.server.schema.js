module.exports = function(mongoose) {
    var UserSchema = mongoose.Schema({
        firstName: {type: String, default: "User"},
        lastName: {type: String, default: "Name"},
        username: {type:String, unique: true},
        password: String,
        emails: {type: [String], default: []},
        phones: {type: [String], default: []},
        roles: {type: [String], default: ["admin"]}
    });
    return UserSchema;
};