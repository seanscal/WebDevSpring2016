(function(){
    angular
        .module("FormBuilderApp")
        .config(Configure);

    function Configure($routeProvider) {
        $routeProvider
            .when("/home",{
                templateUrl: "./views/home/home.view.html",
                controller: "HomeController as Home",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/register", {
                templateUrl: "./views/users/register.view.html",
                controller: "RegisterController as Register"
            })
            .when("/login", {
                templateUrl: "./views/users/login.view.html",
                controller: "LoginController as Login",
            })
            .when("/profile", {
                templateUrl: "./views/users/profile.view.html",
                controller: "ProfileController as Profile",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/admin", {
                templateUrl: "./views/admin/admin.view.html",
                controller: "AdminController as Admin",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/forms", {
                templateUrl: "./views/forms/forms.view.html",
                controller: "FormsController as Forms",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/forms/:formId/fields", {
                templateUrl: "./views/forms/field.view.html",
                controller: "FieldController as Fields",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
    }

    var checkAdmin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();
        console.log("admin?")

        $http.get('/api/assignment5/loggedin').success(function(user)
        {
            $rootScope.errorMessage = null;
            // User is Authenticated
            console.log(user.roles.indexOf('admin'));

            if (user !== '0' && user.roles.indexOf('admin') != -1)
            {
                console.log(user);
                $rootScope.currentUser = user;
                deferred.resolve();
            }
        });

        return deferred.promise;
    };


    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment5/loggedin').success(function(user)
        {
            console.log(user);
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0')
            {
                console.log("HERE");
                $rootScope.currentUser = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else
            {
                deferred.reject();
                $rootScope.currentUser = null;
                $location.url('/login');
            }
        });

        return deferred.promise;
    };

    var checkCurrentUser = function($q, $timeout, $http, $location, $rootScope)
    {
        var deferred = $q.defer();

        $http.get('/api/assignment5/loggedin').success(function(user)
        {
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