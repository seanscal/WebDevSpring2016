(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, UserService){
        $scope.register = register;

        function register() {
            if ($scope.user.password !== $scope.user.verifyPassword) {
                $scope.passwordVerification = "Your passwords do not match";
            }
            else {
                $scope.passwordVerification = null;

                UserService.createUser($scope.user).then(function(res){
                    UserService.setCurrentUser(res);
                    $rootScope.$location.url('/profile');
                });
            }
        }
    }
})();