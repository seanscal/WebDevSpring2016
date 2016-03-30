var q = require("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db, FormModel) {
    var FieldSchema = require('./field.server.schema.js')(mongoose);
    var Field = mongoose.model("Field", FieldSchema);

    var api = {
        findAllFieldsByForm: findAllFieldsByForm,
        findFieldByForm: findFieldByForm,
        deleteField: deleteField,
        updateField: updateField,
        createField: createField
    };
    return api;

    function findAllFieldsByForm(form) {
        return form.fields;
    }

    function findFieldByForm(form, fieldId) {
        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i]._id == fieldId) {
                return form.fields[i];
            }
        }
        return null;
    }

    function deleteField(form, fieldId) {
        var deferred = q.defer();

        for (var i = 0; i < form.fields.length; i++) {
            if (form.fields[i]._id == fieldId) {
                var deleted = form.fields.splice(i, 1);
            }
        }

        form.save(function (err, saved) {
            Field.remove({_id: fieldId}, function (err, response) {
                deferred.resolve(response);
            });
        });

        return deferred.promise;
    }

    function updateField(form, fieldId, newField) {
        var deferred = q.defer();
        delete form._id;

        Field.update({_id: fieldId}, newField, function(err, response) {
            if (err) {
                deferred.reject(err);
            } else {
                for (var i = 0; i < form.fields.length; i++) {
                    if (form.fields[i]._id == fieldId) {
                        form.fields[i] = newField;
                        FormModel.updateFormNoParse(form._id, form).then(
                            function (doc) {
                                deferred.resolve(newField);
                            },
                            function (err) {
                                res.status(400).send(err);
                            });
                    }
                }
            }
        });
        return deferred.promise;
    }

    function createField(form, newField) {
        var deferred = q.defer();
        Field.create(newField, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                form.fields.push(doc);
                form.save(function (err, saved) {
                    var fields = findAllFieldsByForm(form);
                    deferred.resolve(fields);
                });
            }
        });
        return deferred.promise;
    }
};