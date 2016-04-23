(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, UserService) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            UserService.logout().then(function(res) {
                UserService.setCurrentUser(null);
                $rootScope.$location.url('/home');
            });
        }
    }
})();