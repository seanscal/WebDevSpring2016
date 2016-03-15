(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope){
        if(!$rootScope.currentUser.roles.indexOf('editor') > -1){
            $rootScope.$location.url('/login')
        }
    }
})();