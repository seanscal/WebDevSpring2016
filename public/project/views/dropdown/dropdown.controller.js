(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("DropDownController", DropDownController);


    function DropDownController ($scope, $rootScope, DropDownService) {
        $scope.dropboxitemselected = function (item) {
            DropDownService.dropdownitemselected(item);
        }
    }
})();