(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $scope.display = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            email: $rootScope.currentUser.email
        };

        $scope.update = update;

        function update() {
            UserService.updateUser($rootScope.currentUser._id, $scope.updates, callback);

            function callback(user){
                $scope.message = "Information update successful"
            }
        }
    }
})();