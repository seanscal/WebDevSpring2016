module.exports = function (mongoose) {
    var UserSchema = mongoose.Schema({
        title: String,
        userId: Integer,
        fields: {
            type: {
                label: String,
                type: String,
                placeholder: {type: String, default: ""},
                options: {type: Array, "default": []}
            }
        }
    });
    return UserSchema;
};