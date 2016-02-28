(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password, callback);

            function callback(user){
                if (user) {
                    $rootScope.currentUser = user;
                    UserService.setCurrentUser(user);
                    $rootScope.$location.url("/profile");
                } else {
                    $scope.error = "Login failed: invalid credentials."
                }
            }
        }
    }
})();