(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $scope, UserService){
        $scope.register = register;

        function register() {
            if ($scope.user.password !== $scope.user.verifyPassword) {
                $scope.passwordVerification = "Your passwords do not match";
            }
            else {
                console.log($scope.user);
                $scope.passwordVerification = null;


                UserService.createUser($scope.user).then(function(res){
                    console.log(res);
                    UserService.setCurrentUser(res);
                    $rootScope.$location.url('/profile');
                });
            }
        }
    }
})();