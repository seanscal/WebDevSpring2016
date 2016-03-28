module.exports = function(app, FormModel) {
    "use strict";

    app.get('/api/assignment/form/:formId/field', findFields);
    app.get('/api/assignment/form/:formId/field/:fieldId', findField);
    app.delete('/api/assignment/form/:formId/field/:fieldId', deleteField);
    app.post('/api/assignment/form/:formId/field', createField);
    app.put('/api/assignment/form/:formId/field/:fieldId', updateField);
    app.put('/api/assignment/form/:formId/field', updateAllFields);

    function findFields(req, res) {
        var fields = FormModel.findAllFieldsByForm(req.params.formId);
        res.json(fields);
    }

    function findField(req, res) {
        var field = FormModel.findFieldByFormId(req.params.formId, req.params.fieldId);
        res.json(field);
    }

    function deleteField(req, res) {
        FormModel.deleteField(req.params.formId, req.params.fieldId);
        res.send(200);
    }

    function createField(req, res) {
        var newFields = FormModel.createField(req.params.formId, req.body);
        res.json(newFields);
    }

    function updateField(req, res) {
        var newField = FormModel.updateField(req.params.formId, req.params.fieldId, req.body);
        res.json(newField);
    }

    function updateAllFields(req, res) {
        var newFields = FormModel.updateAllFields(req.params.formId, req.body);
        res.json(newFields);
    }
};