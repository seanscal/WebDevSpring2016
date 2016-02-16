(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope) {
        $scope.setUsername = setUsername;

        function setUsername(username) {
            $scope.user = username;
        }

        function getUsername() {
            return $scope.user;
        }
    }
})();