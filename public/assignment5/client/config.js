(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController as Home"
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController as Register"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController as Login"
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController as Profile"
            })
            .when("/editor", {
                templateUrl: "./views/editor/editor.view.html",
                controller: "AdminController as Admin"
            })
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormsController as Forms"
            })
            .when("/forms/:formId/fields", {
                templateUrl: "./views/forms/field.view.html",
                controller: "FieldController as Fields"
            })
    }
})();