var q = require("q");
var formsMock = require("./form.mock.json");

module.exports = function(mongoose) {
    var FormSchema = require("./form.server.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var api = {
        createForm: createForm,
        getAllForms: getAllForms,
        updateForm: updateForm,
        deleteForm: deleteForm,
        getForm:getForm
    };
    return api;

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function getForm(formId) {
        for (var i in formsMock) {
            if (usersMock[i]._id === formId) {
                return formsMock[i];
            }
        }
        return null;
    }

    function getAllForms() {
        var users = [];
        for (var i in formsMock) {
            users.push(formsMock[i])
        }
        return users;
    }
    function updateForm(formId, doc) {
        for(var i in formsMock) {
            if (formsMock[i]._id === formId) {
                formsMock[i].title = doc.title;
                formsMock[i].userId = doc.userId;
                formsMock[i].fields = doc.fields;
            }
        }
    }

    function deleteForm(form) {
        for(var i in mock) {
            if (formsMock[i].formname === formId) {
                mock.pop(formsMock[i]);
            }
        }
        return form;
    }

};