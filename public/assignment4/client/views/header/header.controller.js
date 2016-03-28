(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope) {
        var vm = this;
        vm.logout = logout;

        function logout() {
            $rootScope.currentUser = null;
            $rootScope.$location.url("/home");
        }
    }
})();