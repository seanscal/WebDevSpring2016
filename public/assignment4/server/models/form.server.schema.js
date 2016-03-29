module.exports = function (mongoose, FieldSchema) {
    var FormSchema = mongoose.Schema({
        title: {type: String, default: "New Form"},
        userId: Number,
        fields: [FieldSchema],
        created: {type: Date, default: Date.now},
        updated: {type: Date, default: Date.now}
    });
    return FormSchema;
};