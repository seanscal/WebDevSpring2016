(function () {
    angular
        .module("DevilsFanApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService.findUserByCredentials(user.username, user.password).then(function (res) {
                if (res.data == null) {
                    vm.error = "Login failed: Invalid credentials."
                }
                else {
                    $rootScope.currentUser = res.data;
                    $rootScope.$location.url("/profile");
                }
            });
        }
    }
})();