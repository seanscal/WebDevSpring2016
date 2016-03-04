(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("EditorController", EditorController);

    function EditorController($scope){
        if(!$rootScope.currentUser.roles.indexOf('editor') > -1){
            $rootScope.$location.url('/login')
        }
    }
})();