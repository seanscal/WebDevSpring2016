var q = require("q");
var uuid = require('node-uuid');
var formsMock = require("./form.mock.json");

module.exports = function(db) {
    //var FormSchema = require("./form.server.schema.js")(mongoose);
    //var FormModel = mongoose.model("FormModel", FormSchema);
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,

        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser,

        findAllFieldsForForm: findAllFieldsForForm,
        findFieldForForm: findFieldForForm,
        deleteField: deleteField,
        createField: createField,
        updateField: updateField
    };
    return api;

    function createForm(form) {
        form._id = uuid.v4();
        formsMock.push(form);
        return form;
    }

    function createFormForUser(form, userId) {
        form._id = uuid.v4();
        form.userId = userId;
        formsMock.push(form);
        return form;
    }

    function findFormById(formId) {
        for (var i =0; i < formsMock.length; i++) {
            if (formsMock[i]._id === formId) {
                return formsMock[i];
            }
        }
        return null;
    }

    function findAllForms() {
        var forms = [];
        for (var i =0; i < formsMock.length; i++) {
            forms.push(formsMock[i])
        }
        return forms;
    }

    function findAllFormsForUser(userId) {
        var forms = [];
        for (var i =0; i < formsMock.length; i++) {
            if(formsMock[i].userId = userId) {
                forms.push(formsMock[i])
            }
        }
        return forms;
    }

    function updateForm(formId, form) {
        for (var i =0; i < formsMock.length; i++) {
            if (formsMock[i]._id === formId) {
                formsMock[i].title = form.title;
                formsMock[i].userId = form.userId;
                formsMock[i].fields = form.fields;
            }
        }
    }

    function deleteForm(formId) {
        for (var i =0; i < formsMock.length; i++) {
            if (formsMock[i].formname === formId) {
                formsMock.splice(i,1);
            }
        }
        return form;
    }


    function findFormByTitle(title) {
        for (var i =0; i < formsMock.length; i++) {
            if (formsMock[i].title === title) {
                return formsMock[i];
            }
        }
        return null;
    }

    function findAllFieldsForForm(formId){
        for (var i =0; i < formsMock.length; i++) {
            if (formsMock[i]._id === formId) {
                return formsMock[i].fields;
            }
        }
        return null;
    }

    function findFieldForForm(formId, fieldId){
        for (var i =0; i < formsMock.length; i++)  {
            if (formsMock[i]._id === formId) {
                for (var j =0; j < formsMock[i].fields.length; j++)
                {
                    if (formsMock[i].fields[j] === fieldId) {
                        return formsMock[i].fields[j];
                    }
                }
            }
        }
        return null;
    }

    function deleteField(formId) {
        for (var i =0; i < formsMock.length; i++)  {
            if (formsMock[i]._id === formId) {
                for (var j =0; j < formsMock[i].fields.length; j++)
                {
                    if (formsMock[i].fields[j] === fieldId) {
                        return formsMock[i].fields.splice(j,1);
                    }
                }
            }
        }
        return null;
    }

    function createField(formId, field) {
        for (var i =0; i < formsMock.length; i++)  {
            if (formsMock[i]._id === formId) {
                field._id = uuid.v4();
                formsMock[i].fields.push(field);
                return field;
            }
        }
        return null;
    }

    function updateField(formId, fieldId, field) {
        for (var i =0; i < formsMock.length; i++)  {
            if (formsMock[i]._id === formId) {
                for (var j =0; j < formsMock[i].fields.length; j++)
                {
                    if (formsMock[i].fields[j] === fieldId) {
                        formsMock[i].fields[j].label = field.label;
                        formsMock[i].fields[j].type = field.type;
                        formsMock[i].fields[j].placeholder = field.placeholder;
                        formsMock[i].fields[j].options = field.options;
                    }
                }
            }
        }
        return form;
    }
};