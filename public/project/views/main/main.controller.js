(function(){
    angular
        .module("DevilsFanApp")
        .controller("MainController", MainController);

    function MainController($rootScope, $location) {
        $rootScope.$location = $location;
        $rootScope.currentUser = null;
        $rootScope.favoritePlayer = "None";
    }
})();




