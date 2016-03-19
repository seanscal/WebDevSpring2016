(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("FieldService", FieldService);

    function FieldService($http) {

        var factory = {};

        factory.createFieldForForm = function(formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        };

        factory.getFieldsForForm = function(formId) {
            return $http.get("/api/assignment/form/" + formId + "/field");
        };

        factory.getFieldForForm = function(formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        };

        factory.deleteFieldFromForm = function(formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        };

        factory.updateField = function(formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        };

        factory.updateAllFields = function(formId, fields) {
            return $http.put("/api/assignment/form/" + formId + "/field", fields);
        };

        return factory;
    }
})();