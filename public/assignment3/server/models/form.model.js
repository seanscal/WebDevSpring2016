odule.exports = function() {
    'use strict';

    var utils = require('./util.js')();

    var forms = [];

    var service = {
        create: createForm,
        findAll: findAllForms,
        findById: findFormById,
        findFormByTitle: findFormByTitle,
        findFormsForUser: findFormsForUser,
        update: updateForm,
        delete: deleteForm,

        fields: {
            create: createField,
            findAll: findAllFields,
            findById: findFieldById,
            update: updateField,
            delete: deleteField
        }
    };

    activate();

    return service;

    function activate() {
        var mockData = require('./form.mock.json');
        for (var i = 0; i < mockData.length; i++) {
            forms.push(mockData[i]);
        }
    }

    function createForm(form) {
        forms.push(form);

        return form;
    }

    function findAllForms() {
        return forms;
    }

    function findFormById(id) {
        var f = findForm(id);

        if (f) {
            return f.form;
        }
    }

    function findFormByTitle(title) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i].title === title) {
                return forms[i];
            }
        }
    }

    function findFormsForUser(userId) {
        return forms.filter(function(form) {
            return form.userId === userId;
        });
    }

    function updateForm(id, form) {
        var f = findForm(id);

        if (f) {
            utils.extend(f.form, form);
            return f.form;
        }
    }

    function deleteForm(id) {
        var f = findForm(id);

        if (f) {
            forms.splice(f.index, 1);
            return f.form;
        }
    }

    function findForm(id) {
        for (var i = 0; i < forms.length; i++) {
            if (forms[i]['_id'] === id) {
                return {
                    index: i,
                    form: forms[i]
                };
            }
        }
    }

    function createField(form, field) {
        form.fields.push(field);

        return form.fields;
    }

    function findAllFields(form) {
        return form.fields;
    }

    function findFieldById(form, id) {
        var f = findField(form, id);

        if (f) {
            return f.field;
        }
    }

    function updateField(form, id, field) {
        var f = findField(form, id);

        if (f) {
            utils.extend(f.field, field);
            return f.field;
        }
    }

    function deleteField(form, id) {
        var f = findField(form, id);

        if (f) {
            form.fields.splice(f.index, 1);
            return f.field;
        }
    }

    function findField(form, fieldId) {
        var fields = form.fields;
        for (var i = 0; i < fields.length; i++) {
            if (fields[i]['_id'] === fieldId) {
                return {
                    field: fields[i],
                    index: i
                };
            }
        }
    }
}