(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope) {
        $scope.setUsername = setUsername;

        function setUsername(username) {
            $rootScope.username = username;
        }
    }
})();