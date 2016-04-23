(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("RosterController", RosterController);

    function RosterController($scope, RosterService, GameService) {

        $scope.players = [];
        $scope.setOrderProp = setOrderProp;
        $scope.printDate = printDate;

        rosterLoad();

        function rosterLoad() {
            RosterService.findAllPlayers().then(function (res) {
                $scope.players = res.data;
            });
        }

        function setOrderProp(prop) {
            if ($scope.orderProp == prop)
            {
                $scope.orderProp = "-" + prop;
                console.log($scope.orderProp)
            }
            else{
                $scope.orderProp = prop;
                console.log($scope.orderProp)
            }
        }

//format birthdays
        function padStr(i) {
            return (i < 10) ? "0" + i : "" + i;
        }

        function printDate(date) {
            date = new Date(date);
            var dateStr = padStr(1 + date.getMonth()) + '/' + padStr(date.getDate()) + '/' + padStr(date.getFullYear());
            return dateStr;
        }
    }
})
();