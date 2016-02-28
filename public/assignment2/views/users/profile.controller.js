(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        $scope.updates = {
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