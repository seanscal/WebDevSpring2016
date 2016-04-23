(function(){
    'use strict';

    angular.module("DevilsFanApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, RosterService){
        var vm = this;

        vm.display = {
            username: $rootScope.currentUser.username,
            password: $rootScope.currentUser.password,
            firstName: $rootScope.currentUser.firstName,
            lastName: $rootScope.currentUser.lastName,
            newEmail: $rootScope.currentUser.newEmail,
            favoritePlayer: $rootScope.currentUser.favoritePlayer,
            allPlayerInfo: $rootScope.currentUser.allPlayerInfo
        };

        vm.display.emails = $rootScope.currentUser.emails;
        vm.display.roles = $rootScope.currentUser.roles;
        vm.players = [];
        vm.updateUser = updateUser;
        vm.fetchPlayers = fetchPlayers();
        vm.favoritePlayer = $scope.currentUser.favoritePlayer;
        vm.dropboxitemselected = dropboxitemselected;

        function fetchPlayers() {
            RosterService.fetchPlayers().then(function(response){
                vm.players = response;
            });
        }

        function dropboxitemselected(player){
            vm.favoritePlayer = player;
            vm.display.favoritePlayer = player.name;

        }

        function updateUser() {
            vm.display.emails.push(vm.display.newEmail);
            console.log(vm.display);
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