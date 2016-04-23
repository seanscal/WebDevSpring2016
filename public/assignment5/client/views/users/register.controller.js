(function(){
    'use strict';

    angular.module("FormBuilderApp")
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
                    UserService.login(res.data).then(function (res) {
                            if (res.data) {
                                UserService.setCurrentUser(res.data);
                                $rootScope.$location.url('/profile');
                            }
                            else {
                                $rootScope.$location.url('/login');
                            }
                        }
                    );
                });
            }
        }
    }
})();