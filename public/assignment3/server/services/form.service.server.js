var model = require("../models/form.model.js")();

module.exports = function (app) {

    app.post("/api/assignment/user/:userId/form", addFormForUser);
    app.get("/api/assignment/user/:userId/form", getAllFormsForUser);
    app.get("/api/assignment/form", getAllForms);
    app.get("/api/assignment/form/:formId", getSingleForm);
    app.put("/api/assignment/form/:formId", updateForm);
    app.delete("/api/assignment/form/:formId", removeForm);


    function getAllForms(req, res) {
        var userId = req.params.userId;
        res.json(model.findAllForms());
    }

    function getAllFormsForUser(req, res) {
        var userId = req.params.userId;
        res.json(model.findAllFormsForUser(userId));
    }

    function addFormForUser(req, res) {
        var userId = req.params.userId;
        res.json(model.createFormForUser(userId));
    }

    function getSingleForm(req, res) {
        var formId = req.params.formId;
        res.json(model.findFormById(formId));
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        res.json(model.update(formId, form));
    }

    function removeForm(req, res) {
        var formId = req.params.formId;
        res.json(model.deleteForm(id));
    }
};