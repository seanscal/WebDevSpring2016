(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService){
        var vm = this;
        vm.register = register;

        function register() {
            if (vm.user.password !== vm.user.verifyPassword) {
                vm.passwordVerification = "Your passwords do not match";
            }
            else {
                vm.passwordVerification = null;

                UserService.createUser(vm.user).then(function(res){
                    $rootScope.currentUser = res.data
                    $rootScope.$location.url('/profile');
                });
            }
        }
    }
})();