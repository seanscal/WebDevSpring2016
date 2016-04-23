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
        updateFormNoParse: updateFormNoParse
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

        console.log("USEID");
        Form.update({_id: formId}, form, function(err, response){
            findForm(formId).then(function(form){
                deferred.resolve(form);
            });
        });
        return deferred.promise;
    }

    function updateFormNoParse(formId, form) {
        var deferred = q.defer();
        delete form._id;

        console.log("USEID");
        Form.update({_id: formId}, form, function(err, response){
            findForm(formId).then(function(form){
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
};