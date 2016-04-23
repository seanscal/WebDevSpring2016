(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("ScheduleController", ScheduleController);

    function ScheduleController($scope, $routeParams, GameService, RosterService) {
        GameService.getAllGames().then(function(res){
            console.log(res);
            $scope.games = res.data;
        });

        $scope.printDate = printDate;

        function padStr(i) {
            return (i < 10) ? "0" + i : "" + i;
        }

        function printDate(date) {
            date = new Date(date);
            var dateStr = padStr(1 + date.getMonth()) + '/' + padStr(date.getDate()) + '/' + padStr(date.getFullYear());
            return dateStr;
        }
    }
})();