(function(){
    'use strict';

    angular
        .module("DevilsFanApp")
        .factory("DropDownService", DropDownService);

    function DropDownService($rootScope) {
        var model = {
            dropdownitemselected: dropdownitemselected,
        };
        return model;

        function dropdownitemselected(item) {
            $rootScope.dropdown = item;
        }
    }
})();