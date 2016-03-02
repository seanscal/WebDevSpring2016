(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $location) {
        $rootScope.$location = $location;
        $rootScope.currentUser = null;
    }
})();