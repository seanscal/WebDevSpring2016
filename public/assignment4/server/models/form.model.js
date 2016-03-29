var q = require("q");
var uuid = require('node-uuid');

module.exports = function (mongoose, db) {
    var FieldSchema = require('./field.server.schema.js')(mongoose);
    var FormSchema = require("./form.server.schema.js")(mongoose, FieldSchema);
    var Form = mongoose.model("Form", FormSchema);

    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findForm: findForm,
        findFormByTitle: findFormByTitle,
        findFormsByUser: findFormsByUser,
        updateForm: updateForm,
        deleteForm: deleteForm,

        findAllFieldsByForm: findAllFieldsByForm,
        findFieldByForm: findFieldByForm,
        deleteField: deleteField,
        updateField: updateField,
        createField: createField,
        updateAllFields: updateAllFields
    };
    return api;

    function createForm(form) {
        var deferred = q.defer();
        Form.create(form, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllForms() {
        var deferred = q.defer();
        Form.find(function (err, forms) {
            deferred.resolve(forms);
        });
        return deferred.promise;
    }

    function findForm(formId) {
        var deferred = q.defer();
        Form.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findFormByTitle(title) {
        var deferred = q.defer();

        Form.findOne(
            {
                title: title
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findFormsByUser(userId) {
        var deferred = q.defer();

        Form.find(
            {
                userId: userId
            },
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();
        delete form._id;
        form.userId = parseInt(form.userId,16);

        console.log(form);
        Form.update({_id: formId}, form, function(err, response){
            findForm(formId).then(function(form){
                console.log(form);
                deferred.resolve(form);
            });
        });
        return deferred.promise;
    }

    function deleteForm(formId) {
        var deferred = q.defer();
        Form.remove({_id: formId}, function(err, response){
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    function findAllFieldsByForm(formId) {
        var form = findForm(formId);
        if (form) {
            return form.fields;
        }
        return null;
    }

    function findFieldByForm(formId, fieldId) {
        var fields = findAllFieldsByForm(formId);
        for (var i in fields) {
            if (fields[i]._id === fieldId) {
                return fields[i];
            }
        }
        return null;
    }

    function deleteField(formId, fieldId) {
        var newFields = [];
        var currentFields = findAllFieldsByForm(formId);
        for (var i in currentFields) {
            if (currentFields[i]._id !== fieldId) {
                newFields.push(currentFields[i]);
            }
        }

        for (var i in formsMock) {
            if (formsMock[i]._id === formId) {
                formsMock[i].fields = newFields;
                return formsMock[i].fields;
            }
        }
        return null;
    }

    function updateField(formId, fieldId, newField) {
        for (var i in formsMock) {
            if (formsMock[i]._id === formId) {
                for (var j in formsMock[i].fields) {
                    if (formsMock[i].fields[j]._id === fieldId) {
                        formsMock[i].fields[j] = newField;
                        return formsMock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function updateAllFields(formId, newFields) {
        for (var i in formsMock) {
            if (formsMock[i]._id === formId) {
                formsMock[i].fields = newFields;
                return formsMock[i].fields;
            }
        }
        return null;
    }

    function createField(formId, newField) {
        newField._id = uuid.v4();
        for (var i in formsMock) {
            if (formsMock[i]._id === formId) {
                formsMock[i].fields.push(newField);
                return formsMock[i].fields;
            }
        }
        return null;
    }
};