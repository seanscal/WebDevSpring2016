(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("PlayerController", PlayerController);

    function PlayerController($scope, $routeParams, RosterService) {

        getCurrentPlayer();
        $scope.printDate = printDate;
        $scope.createModal = createModal;
        $scope.noAutoPlay = noAutoPlay;

        function getCurrentPlayer() {
            RosterService.findPlayerById($routeParams.id).then(function(res){
                $scope.currentPlayer = res.data;
                console.log($scope.currentPlayer);
            });
        }

        //format birthdays
        function padStr(i) {
            return (i < 10) ? "0" + i : "" + i;
        }

        function printDate(date) {
            date = new Date(date);
            var dateStr = padStr(1+date.getMonth()) + '/' + padStr(date.getDate())  + '/'+ padStr(date.getFullYear());
            return dateStr;
        }

        function createModal(index) {
            jQuery("#" + index + ".videoModal").dialog({
                resizeable: false,
                height: 700,
                width: 1100,
                modal: true
            });
        }

        function noAutoPlay(video) {
            if (video) {
                var contains = video.indexOf("neulion") > -1;
                return contains;
            }
            return null;
        }
    }
})();