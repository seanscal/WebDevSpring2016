(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("FormService", FormService);

    function FormService($http) {

        var factory = {};

        factory.createFormForUser = function(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        };

        factory.findAllFormsForUser = function(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form");
        };

        factory.deleteForm = function(formId) {
            return $http.delete("/api/assignment/form/" + formId);
        };

        factory.updateForm = function(formId, newForm) {
            return $http.put("/api/assignment/form/" + formId, newForm);
        };

        return factory;
    }
})();