(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($scope, LoginController) {
        $scope.username = LoginController.getUsername() || ""
    }
})();