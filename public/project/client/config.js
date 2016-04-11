(function(){
    angular
        .module("DevilsFanApp")
        .config(Configure);

    function Configure($routeProvider,$httpProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController as Register"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController as Login"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController as Profile"
            })
            .when("/editor", {
                templateUrl: "views/editor/editor.view.html",
                controller: "EditorController as Editor"
            })
            .when("/roster", {
                templateUrl: "views/players/roster.view.html",
                controller: "RosterController as Roster"
            })
            .when("/players/:id", {
                templateUrl: "views/players/player.view.html",
                controller: "PlayerController as Player"
            })
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "SearchController as Search"
            })
            .when("/games", {
                templateUrl: "views/games/schedule.view.html",
                controller: "ScheduleController as Sched"
            })
            .when("/games/:id", {
                templateUrl: "views/games/game.view.html",
                controller: "GameController as Game"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();