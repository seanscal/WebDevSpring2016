module.exports = function (app, FormModel, FieldModel) {
    "use strict";

    app.get('/api/assignment4/form/:formId/field', findFields);
    app.get('/api/assignment4/form/:formId/field/:fieldId', findField);
    app.delete('/api/assignment4/form/:formId/field/:fieldId', deleteField);
    app.post('/api/assignment4/form/:formId/field', createField);
    app.put('/api/assignment4/form/:formId/field/:fieldId', updateField);

    function findFields(req, res) {
        console.log("On the server");
        console.log(req.params.formId);
        FormModel.findForm(req.params.formId).then(
            function (doc) {
                var fields = FieldModel.findAllFieldsByForm(doc)
                res.json(fields);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findField(req, res) {
        FormModel.findForm(req.params.formId).then(
            function (doc) {
                var field = FieldModel.findFieldByFormId(form, req.params.fieldId);
                res.json(field);
            },
            function (err) {
                res.status(400).send(err);
            });

    }

    function deleteField(req, res) {
        console.log("delete field hit");
        FormModel.findForm(req.params.formId).then(
            function (doc) {
                FieldModel.deleteField(doc, req.params.fieldId).then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function createField(req, res) {
        FormModel.findForm(req.params.formId).then(
            function (doc) {
                FieldModel.createField(doc, req.body).then(
                    function (doc) {
                        console.log(doc);
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateField(req, res) {
        FormModel.findForm(req.params.formId).then(
            function (doc) {
                console.log("Updating fields server");
                console.log(doc);
                console.log(req.body);
                console.log("Updating fields server");
                var fields = FieldModel.updateField(doc, req.params.fieldId, req.body).then(
                    function (doc) {
                        res.json(doc);
                    },
                    function (err) {
                        res.status(400).send(err);
                    });
                res.json(fields);
            },
            function (err) {
                res.status(400).send(err);
            })
    }
};