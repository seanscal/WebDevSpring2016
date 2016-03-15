(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }
    }
})();