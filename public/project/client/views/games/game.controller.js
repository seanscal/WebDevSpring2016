(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("GameController", GameController);

    function GameController($scope, $routeParams, GameService, RosterService) {
        GameService.findGameById($routeParams.id).then(function (res) {
            $scope.game = res.data;
            $scope.players=[];
            for(var x in $scope.game.stats[0].roster){
                RosterService.findPlayerByNumber($scope.game.stats[0].roster[x].number).then(function (response) {
                    if(!response.data){
                        $scope.players.push("Lee Stempniak")
                    }

                    $scope.players.push(response.data.name);
                });
            }
        });

        $scope.createModal = createModal;
        $scope.noAutoPlay = noAutoPlay;
        $scope.findPlayer = findPlayer;

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

        function findPlayer(index) {
            return $scope.players[index];
        }

        //TODO: PAUSE VIDEO ON CLOSE
    }
})();