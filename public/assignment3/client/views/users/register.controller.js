(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService){
        var vm = this;
        vm.register = register;

        function register() {
            if (vm.user.password !== vm.user.verifyPassword) {
                vm.passwordVerification = "Your passwords do not match";
            }
            else {
                vm.passwordVerification = null;

                UserService.createUser(vm.user).then(function(res){
                    console.log(res);
                    main.currentUser = res.data
                    main.$location.url('/profile');
                });
            }
        }
    }
})();