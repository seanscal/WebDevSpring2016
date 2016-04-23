(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var factory = {};

        factory.createFieldForForm = function(formId, field) {
            return $http.post("/api/assignment5/form/" + formId + "/field", field);
        };

        factory.getFieldsForForm = function(formId) {
            return $http.get("/api/assignment5/form/" + formId + "/field");
        };

        factory.getFieldForForm = function(formId, fieldId) {
            return $http.get("/api/assignment5/form/" + formId + "/field/" + fieldId);
        };

        factory.deleteFieldFromForm = function(formId, fieldId) {
            return $http.delete("/api/assignment5/form/" + formId + "/field/" + fieldId);
        };

        factory.updateField = function(formId, fieldId, field) {
            console.log("Updating fields");
            console.log(formId, fieldId, field);
            return $http.put("/api/assignment5/form/" + formId + "/field/" + fieldId, field);
        };

        factory.updateAllFields = function(formId, fields) {
            return $http.put("/api/assignment5/form/" + formId + "/field", fields);
        };

        return factory;
    }
})();