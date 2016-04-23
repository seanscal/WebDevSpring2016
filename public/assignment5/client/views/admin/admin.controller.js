(function(){
    'use strict';

    angular.module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope, $scope, UserService){
        if(!$rootScope.currentUser){
            $rootScope.$location.url('/login')
        }

        refresh();

        $scope.addUser = addUser;
        $scope.updateUser = updateUser;
        $scope.deleteUser = deleteUser;
        $scope.selectUser = selectUser;

        function addUser() {
            var newUser = {
                "username": $scope.username,
                "password": $scope.password,
                "firstName": $scope.firstName,
                "lastName": $scope.lastName,
                "roles": [$scope.roles]
            }
            UserService.createUser(newUser).then(function(res) {
                $scope.username = null;
                $scope.password = null;
                $scope.firstName = null;
                $scope.lastName = null;
                $scope.roles = null;
                refresh()
            });
        }

        function updateUser() {
            $scope.selectedUser.username = $scope.username;
            $scope.selectedUser.password = $scope.password;
            $scope.selectedUser.firstName = $scope.firstName;
            $scope.selectedUser.lastName = $scope.lastName;
            $scope.selectedUser.roles = $scope.roles;
            UserService. updateUser ($scope.selectedUser._id, $scope.selectedUser).then(function(res) {
                $scope.selectedUser = null;
                $scope.username = null;
                $scope.password = null;
                $scope.firstName = null;
                $scope.lastName = null;
                $scope.roles = null;
                refresh();
            });

        }

        function deleteUser(index) {
            UserService.deleteUserById($scope.users[index]._id).then(function(res) {
                refresh();
            })
        }

        function selectUser(index) {
            $scope.selectedUser = $.extend(true, {}, $scope.users[index]);

            $scope.username = $scope.selectedUser.username;
            $scope.password = $scope.selectedUser.password;
            $scope.firstName = $scope.selectedUser.firstName;
            $scope.lastName = $scope.selectedUser.lastName;
            $scope.roles = $scope.selectedUser.roles;
        }

        function refresh() {
            UserService.findAllUsers().then(function(res) {
                $scope.users = res.data;
            });
        }
    }
})();