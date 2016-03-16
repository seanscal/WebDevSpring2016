(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($scope, $rootScope, UserService) {
        $scope.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(res){
                if (res){
                    console.log(res);
                    $rootScope.currentUser = res[0];
                    UserService.setCurrentUser(res);
                    $rootScope.$location.url("/profile");
                }
                else {
                    $scope.error = "Login failed: invalid credentials."
                }
            });
        }
    }
})();