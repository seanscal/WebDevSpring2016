var q = require("q");
var uuid = require('node-uuid');
var formsMock = require("./form.mock.json");

module.exports = function() {
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        findFormBy: findFormBy,
        findFormByTitle: findFormByTitle,
        findFormByUser: findFormByUser,
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
        form._id = uuid.v4();
        form.label = null;
        form.type = null;
        form.fields = [];
        formsMock.push(form);
        return form;
    }

    function findAllForms() {
        return formsMock;
    }

    function findFormBy(formId) {
        for (var i in formsMock) {
            if (formsMock[i]._id === formId) {
                return formsMock[i];
            }
        }
        return null;
    }

    function findFormByTitle(title) {
        for (var i in formsMock) {
            if (formsMock[i].title === title) {
                return formsMock[i];
            }
        }
        return null;
    }

    function findFormByUser(userId) {
        var userForms = [];
        for (var i in formsMock) {
            if (formsMock[i].userId === userId) {
                userForms.push(formsMock[i])
            }
        }
        return userForms;
    }

    function updateForm(formId, form) {
        for (var i in formsMock) {
            console.log(formsMock[i]);
            if (formsMock[i]._id === formId) {
                formsMock[i].title = form.title;
                return formsMock[i];
            }
        }
        return null;
    }

    function deleteForm(formId) {
        var newForms = [];
        for (var i in formsMock) {
            if (formsMock[i]._id !== formId) {
                newForms.push(formsMock[i]);
            }
        }
        formsMock = newForms;
    }

    function findAllFieldsByForm(formId) {
        var form = findFormBy(formId)
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
                console.log(formsMock[i]);
                formsMock[i].fields.push(newField);
                return formsMock[i].fields;
            }
        }
        return null;
    }
};