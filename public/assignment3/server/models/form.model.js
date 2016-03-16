var q = require("q");
var formsMock = require("./form.mock.json");


module.exports = function(mongoose) {
    var FormSchema = require("./form.server.schema.js")(mongoose);
    var FormModel = mongoose.model("FormModel", FormSchema);
    var api = {
        createForm: createForm,
        getAllForms: getAllForms,
        findFormByFormname: findFormByFormname,
        updateForm: updateForm,
        findFormByCredentials: findFormByCredentials,
        deleteForm: deleteForm
    };
    return api;

    function createForm(form) {
        form._id = "ID_" + (new Date()).getTime();
        mock.push(form);
        return form;
    }

    function getAllForms() {
        var deferred = q.defer();

        setTimeout(
            function() {
                deferred.resolve(formsMock);
            },
            100
        );

        return deferred.promise;
    }

    function updateForm(formId, doc) {
        for(var i in mock) {
            if (formsMock[i]._id === formId) {
                formsMock[i].firstName = doc.firstName;
                formsMock[i].lastName = doc.lastName;
                formsMock[i].formname = doc.formname;
                formsMock[i].password = doc.password;
                formsMock[i].email = doc.email;
            }
        }
    }

    function deleteForm(form) {
        for(var i in mock) {
            if (formsMock[i].formname === formId && formsMock[i].password == credentials.password) {
                mock.pop(form);
            }
        }
        return form;
    }

};