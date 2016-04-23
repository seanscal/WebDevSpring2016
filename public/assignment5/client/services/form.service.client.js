(function() {
    "use strict";
    angular
        .module('FormBuilderApp')
        .factory("FormService", FormService);

    function FormService($http) {

        var factory = {};

        factory.createFormForUser = function(userId, form) {
            return $http.post("/api/assignment5/user/" + userId + "/form", form);
        };

        factory.findAllFormsForUser = function(userId) {
            return $http.get("/api/assignment5/user/" + userId + "/form");
        };

        factory.deleteForm = function(formId) {
            return $http.delete("/api/assignment5/form/" + formId);
        };

        factory.updateForm = function(formId, newForm) {
            return $http.put("/api/assignment5/form/" + formId, newForm);
        };

        return factory;
    }
})();