module.exports = function(app, FormModel) {
    "use strict";

    app.get('/api/assignment/form', findAllForms);
    app.get('/api/assignment/user/:userId/form', findFormBy);
    app.get('/api/assignment/form/:formId', findForm);
    app.delete('/api/assignment/form/:formId', deleteForm);
    app.post('/api/assignment/user/:userId/form', createForm);
    app.put('/api/assignment/form/:formId', updateForm);

    function findAllForms(req, res) {
        var forms = FormModel.findAllForms();
        res.json(forms);
    }

    function findFormBy(req, res) {
        var userId = parseInt(req.params.userId);
        var form = FormModel.findFormByUser(userId);
        res.json(form);
    }

    function findForm(req, res) {
        var form = FormModel.findForm(req.params.formId);
        res.json(form);
    }

    function deleteForm(req, res) {
        FormModel.deleteForm(req.params.formId);
        res.send(200);
    }

    function createForm(req, res) {
        var userId = parseInt(req.params.userId);
        var newForm = req.body;
        newForm.userId = userId;
        var form = FormModel.createForm(newForm);
        res.json(form);
    }

    function updateForm(req, res) {
        var form = FormModel.updateForm(req.params.formId, req.body);
        res.json(form);
    }
};