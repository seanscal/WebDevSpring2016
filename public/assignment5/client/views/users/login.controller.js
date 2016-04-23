(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login(user) {
            UserService.login(user).then(function (res) {
                    if (res.data) {
                        UserService.setCurrentUser(res.data);
                        $rootScope.$location.url('/profile');
                    }
                    else {
                        $rootScope.$location.url('/login');
                    }
                }
            );
        }
    }
})();