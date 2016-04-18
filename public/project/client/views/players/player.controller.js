(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("PlayerController", PlayerController);

    function PlayerController($scope, $routeParams, RosterService) {

        getCurrentPlayer();
        $scope.printDate = printDate;
        $scope.createModal = createModal;
        $scope.noAutoPlay = noAutoPlay;
        $scope.updateTopFive = updateTopFive;

        function getCurrentPlayer() {
            RosterService.findPlayerById($routeParams.id).then(function(res){
                $scope.currentPlayer = res.data;
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

        function updateTopFive(highlight) {
            for(var y in $scope.currentPlayer.highlights){
                if($scope.currentPlayer.highlights[y].player1total == highlight.player){
                    $scope.currentPlayer.highlights[y].topFive = true;
                }
            }
            if(highlight.topFive){
                var newTopFive = [];
                highlight.topFive = false;
                for(var x = 0; x < $scope.currentPlayer.topFive.length; x++){
                    if ($scope.currentPlayer.topFive[x].player1total != highlight.player1total){
                        newTopFive.push($scope.currentPlayer.topFive[x]);
                    }
                }
                $scope.currentPlayer.topFive = newTopFive;
                RosterService.updatePlayerTopHighlight($scope.currentPlayer).then(function(res){
                    console.log(res.data);
                })
            }
            else if ($scope.currentPlayer.topFive.length < 5){
                highlight.topFive = true;
                $scope.currentPlayer.topFive.push(highlight);
                console.log("update");
                RosterService.updatePlayerTopHighlight($scope.currentPlayer).then(function(res){
                    console.log(res.data);
                })
            }
            else{
                alert("You may only have 5 top highlights, this highlight will not be saved as a top highlight");
            }
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