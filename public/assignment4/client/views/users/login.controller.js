(function(){
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController($rootScope, UserService) {
        var vm = this;
        vm.login = login;

        function login (user) {
            UserService.findUserByCredentials(user.username, user.password).then(function(res){
                if (res){
                    $rootScope.currentUser = res.data;
                    $rootScope.$location.url("/profile");
                }
                else {
                    vm.error = "Login failed: invalid credentials."
                }
            });
        }
    }
})();