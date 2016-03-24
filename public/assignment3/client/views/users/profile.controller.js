(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService){
        var vm = this;

        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        vm.display = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            email: $rootScope.currentUser.email
        };

        console.log(vm.display);
        vm.updateUser = updateUser;

        function updateUser() {

            UserService.updateUser($rootScope.currentUser._id, vm.display).then(function(res){
                console.log(res.data);
                vm.message = "Information update successful";
                $rootScope.currentUser.username = res.data.username;
                $rootScope.currentUser.password = res.data.password;
                $rootScope.currentUser.firstName = res.data.firstName;
                $rootScope.currentUser.lastName = res.data.lastName;
                $rootScope.currentUser.email = res.data.email;
            });
        }
    }
})();