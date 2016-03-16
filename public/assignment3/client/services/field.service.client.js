(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http, $q){

        var service = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return service;

        function getFieldsForForm(formId){
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function getFieldForForm(formId, fieldId){
            var deferred = $q.defer();
            $http.get("/api/assignment/form/"+formId+"/field/"+fieldId).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createFieldForForm(formId, field){
            var deferred = $q.defer();
            $http.post("/api/assignment/form/"+formId+"/field", field).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteFieldFromForm(formId, fieldId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/"+formId+"/field/"+fieldId).success(function(response){
                if (res.ok == 1) {
                    $http.get("/api/assignment/form").success(function (forms) {
                        deferred.resolve(forms);
                    });
                }
            });
            return deferred.promise;
        }

        function updateField(formId, fieldId, field){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/"+formId+"/field/"+fieldId, field).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

    }
})();