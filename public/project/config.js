(function(){
    angular
        .module("DevilsFanApp")
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
                controller: "EditorController"
            })
            .when("/roster", {
                templateUrl: "./views/players/roster.view.html",
                controller: "RosterController"
            })
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormsController"
            })
            .when("/fields", {
                templateUrl: "./views/forms/fields.view.html",
                controller: "FieldsController"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();