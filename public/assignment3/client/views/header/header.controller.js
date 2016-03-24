(function(){
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController);

    function HeaderController() {
        var vm = this;
        vm.logout = logout;

        function logout() {
            main.currentUser = null;
            main.$location.url("/home");
        }
    }
})();