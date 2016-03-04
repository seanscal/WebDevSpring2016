(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("FieldsController", FieldsController);

    function FieldsController($scope){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }
    }
})();