(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, UserService) {
        var vm = this;
        vm.logout = logout;
        vm.currentUser = UserService.loggedIn();

        function logout() {
            vm.currentUser = null;
            $rootScope.$location.url("/home");
        }
    }
})();