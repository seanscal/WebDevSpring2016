(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, UserService){
        $scope.register = register;

        function register() {
            if ($scope.user.password !== $scope.user.verifyPassword) {
                $scope.passwordVerification = "Your passwords do not match";
                return;
            }
            else {
                $scope.passwordVerification = null;

                UserService.createUser($scope.user, callback);

                function callback(user) {
                    $rootScope.currentUser = user;
                    $rootScope.$location.url('/profile');
                }
            }
        }
    }
})();