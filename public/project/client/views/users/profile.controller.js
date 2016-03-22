(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, $scope, UserService){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        if($rootScope.currentUser.favoritePlayer)
        {
            $rootScope.favoritePlayer = $rootScope.currentUser.favoritePlayer
        }

        $scope.display = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            email: $rootScope.currentUser.email,
            favoritePlayer: $rootScope.currentUser.favoritePlayer
        };

        $scope.update = update;

        function update() {
            UserService.updateUser($rootScope.currentUser._id, $scope.display, callback);

            function callback(user){
                $scope.message = "Information update successful"
                console.log($rootScope.currentUser)
            }
        }
    }
})();