(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, UserService){
        var vm = this;
        vm.register = register;

        function register() {
            vm.user.emails = [];
            if (vm.user.password !== vm.user.verifyPassword) {
                vm.passwordVerification = "Your passwords do not match";
            }
            else {
                vm.user.emails.push(vm.user.newEmail);
                vm.passwordVerification = null;

                UserService.createUser(vm.user).then(function(res){
                    UserService.setCurrentUser(res.data);
                    console.log(res.data);
                    console.log("ayyp");
                    $rootScope.$location.url('/profile');
                });
            }
        }
    }
})();