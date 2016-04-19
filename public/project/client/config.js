(function () {
    angular
        .module("DevilsFanApp")
        .config(Configure);

    function Configure($routeProvider, $httpProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController",
                resolve: {
                    loggedin: checkCurrentUser
                }
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
                controller: "ProfileController as Profile",
                resolve: {
                    loggedin: checkLoggedin
                }
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
                controller: "PlayerController as Player",
                resolve: {
                    loggedin: checkLoggedin
                }
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
                controller: "GameController as Game",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .otherwise({
                redirectTo: "/home"
            });
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)


        {
            console.log("hello");
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
                deferred.resolve(user);
            }
            // User is Not Authenticated
            else
            {
                $rootScope.errorMessage = 'You need to log in.';
                console.log("ERROR");
                deferred.reject();
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                $rootScope.currentUser = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };
})();