var model = require("../models/form.model.js")();

module.exports = function (app) {

    app.post("/api/assignment/form/:formId/field/", addField);
    app.get("/api/assignment/form/:formId/field/", getAllFieldsForForm);
    app.get("/api/assignment/form/:formId/field/:fieldId/", getSingleFieldFromForm);
    app.put("/api/assignment/form/:formId/field/:fieldId/", updateField);
    app.delete("/api/assignment/form/:formId/field/:fieldId/", removeField);

    function getAllFieldsForForm(req, res) {
        var formId = req.params.formId;
        res.json(model.findAllFieldsForForm(formId));
    }

    function getSingleFieldFromForm(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.findFieldForForm(formId, fieldId));
    }

    function removeField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(model.deleteField(formId, fieldId));
    }

    function updateField(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        var field = req.body;
        res.json(model.updateField(formId, fieldId, field));
    }

    function addField(req, res) {
        var formId = req.params.formId;
        var field = req.body;
        res.json(model.createField(formId, field));
    }
};