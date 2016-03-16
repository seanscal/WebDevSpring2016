var q = require("q");
var uuid = require('node-uuid');
var formsMock = require("./form.mock.json");

module.exports = function(mongoose) {
    var FormSchema = require("./form.server.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var api = {
        createForm: createForm,
        findAllForms: findAllForms,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormById: findFormById,
        findFormByTitle: findFormByTitle,
        findAllFormsForUser: findAllFormsForUser,
        createFormForUser: createFormForUser
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
        for (var i in formsMock) {
            if (formsMock[i]._id === formId) {
                return formsMock[i];
            }
        }
        return null;
    }

    function findAllForms() {
        var forms = [];
        for (var i in formsMock) {
            forms.push(formsMock[i])
        }
        return forms;
    }

    function findAllFormsForUser(userId) {
        var forms = [];
        for (var i in formsMock) {
            if(formsMock[i].userId = userId) {
                forms.push(formsMock[i])
            }
        }
        return forms;
    }

    function updateForm(formId, form) {
        for(var i in formsMock) {
            if (formsMock[i]._id === formId) {
                formsMock[i].title = form.title;
                formsMock[i].userId = form.userId;
                formsMock[i].fields = form.fields;
            }
        }
    }

    function deleteForm(formId) {
        for(var i in formsMock) {
            if (formsMock[i].formname === formId) {
                formsMock.pop(formsMock[i]);
            }
        }
        return form;
    }


    function findFormByTitle(title) {
        for (var i in formsMock) {
            if (formsMock[i].title === title) {
                return formsMock[i];
            }
        }
        return null;
    }
};