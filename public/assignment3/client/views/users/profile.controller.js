(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService){
        var vm = this;

        if(!main.currentUser){
            main.$location.url('/login')
        }

        vm.display = {
            username: main.currentUser.username,
            password: main.currentUser.password,
            firstName: main.currentUser.firstName,
            lastName: main.currentUser.lastName,
            email: main.currentUser.email
        };

        console.log(vm.display);
        vm.updateUser = updateUser;

        function updateUser() {

            UserService.updateUser(main.currentUser._id, vm.display).then(function(res){
                console.log(res.data);
                vm.message = "Information update successful";
                main.currentUser.username = res.data.username;
                main.currentUser.password = res.data.password;
                main.currentUser.firstName = res.data.firstName;
                main.currentUser.lastName = res.data.lastName;
                main.currentUser.email = res.data.email;
            });
        }
    }
})();