(function(){
    "use strict";
    angular.module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http, $q){

        var service = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return service;

        function findAllFormsForUser(userId){
            var deferred = $q.defer();
            $http.get("/api/assignment/user/"+ userId +"/form").success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function createFormForUser(userId, form){
            var deferred = $q.defer();
            $http.post("/api/assignment/user/"+ userId +"/form", form).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

        function deleteFormById(formId){
            var deferred = $q.defer();
            $http.delete("/api/assignment/form/" + formId).success(function(response){
                if (res.ok == 1) {
                    $http.get("/api/assignment/form").success(function (forms) {
                        deferred.resolve(forms);
                    });
                }
            });
            return deferred.promise;
        }

        function updateFormById(formId, form){
            var deferred = $q.defer();
            $http.put("/api/assignment/form/" + formId, form).success(function(response){
                deferred.resolve(response);
            });
            return deferred.promise;
        }

    }
})();