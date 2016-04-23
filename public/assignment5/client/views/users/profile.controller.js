(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService){
        var vm = this;

        vm.display = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            newEmail: $rootScope.currentUser.newEmail
        };

        vm.display.emails = $rootScope.currentUser.emails;

        vm.updateUser = updateUser;

        function updateUser() {
            vm.display.emails.push(vm.display.newEmail);
            UserService.updateUser($rootScope.currentUser._id, vm.display).then(function(res){
                console.log(res.data);
                vm.message = "Information update successful";
                $rootScope.currentUser.username = res.data.username;
                $rootScope.currentUser.password = res.data.password;
                $rootScope.currentUser.firstName = res.data.firstName;
                $rootScope.currentUser.lastName = res.data.lastName;
                $rootScope.currentUser.emails = res.data.emails;
            });
        }
    }
})();