(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope){
        if(!main.currentUser.roles.indexOf('editor') > -1){
            main.$location.url('/login')
        }
    }
})();