(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController"
            })
            .when("/editor", {
                templateUrl: "./views/editor/editor.view.html",
                controller: "AdminController"
            })
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormsController"
            })
            .when("/form/:formId/fields", {
                templateUrl: "./views/forms/field.view.html",
                controller: "FieldController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();