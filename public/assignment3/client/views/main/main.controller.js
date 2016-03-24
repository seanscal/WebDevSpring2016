(function(){
    angular
        .module("FormBuilderApp")
        .controller("MainController", MainController);

    function MainController($location) {
        var main = this;
        main.$location = $location;
        main.currentUser = null;
        main.formParam =0;
        main.fields=false;
    }
})();