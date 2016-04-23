module.exports = function (app, FormModel) {
    "use strict";

    app.get('/api/assignment5/form', findAllForms);
    app.get('/api/assignment5/user/:userId/form', findFormsByUser);
    app.get('/api/assignment5/form/:formId', findForm);
    app.delete('/api/assignment5/form/:formId', deleteForm);
    app.post('/api/assignment5/user/:userId/form', createForm);
    app.put('/api/assignment5/form/:formId', updateForm);

    function findAllForms(req, res) {
        FormModel.findAllForms().then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findFormsByUser(req, res) {
        var userId = parseInt(req.params.userId, 16);
        FormModel.findFormsByUser(userId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function findForm(req, res) {
        FormModel.findForm(req.params.formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function deleteForm(req, res) {
        FormModel.deleteForm(req.params.formId).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function createForm(req, res) {
        var userId = parseInt(req.params.userId, 16);
        var newForm = req.body;
        newForm.userId = userId;
        FormModel.createForm(newForm).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }

    function updateForm(req, res) {
        FormModel.updateForm(req.params.formId, req.body).then(
            function (doc) {
                res.json(doc);
            },
            function (err) {
                res.status(400).send(err);
            });
    }
};