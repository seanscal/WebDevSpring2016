(function(){
    angular
        .module("DevilsFanApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, $rootScope, UserService, DropDownService) {
        $scope.logout = logout;
        $scope.dropDown = dropDown;

        function logout() {
            $rootScope.currentUser = null;
            $rootScope.$location.url("/home");
        }
        function dropDown(item) {
            DropDownService.dropdownitemselected(item);
        }
    }
})();