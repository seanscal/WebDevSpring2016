(function () {
    'use strict';

    angular.module("DevilsFanApp")
        .controller("GameController", GameController);

    function GameController($scope, $routeParams, GameService, RosterService, $rootScope, UserService) {
        
        $scope.createModal = createModal;
        $scope.noAutoPlay = noAutoPlay;
        $scope.findPlayer = findPlayer;
        $scope.editPlayerName = editPlayerName;
        $scope.createEditModal = createEditModal;
        $scope.createStoryModal = createStoryModal;
        $scope.admin = admin;
        getGame();

        function getGame(){
            GameService.findGameById($routeParams.id).then(function (res) {
                $scope.game = res.data;
                $scope.players=[];
                if ($scope.game.playerNameArray){
                    $scope.players = $scope.game.playerNameArray.split(',');
                }
                else{
                    for(var x in $scope.game.stats[0].roster){
                        RosterService.findPlayerByNumber($scope.game.stats[0].roster[x].number).then(function (response) {
                            if(!response.data){
                                $scope.players.push("Unknown");
                            }
                            else{
                                $scope.players.push(response.data.name);
                            }
                            $scope.game.playerNameArray = $scope.players;

                            GameService.updateGame($scope.game).then(function (response){
                            });
                        });
                    }
                }
            });
        }

        function createModal(index) {
            jQuery("#" + index + ".videoModal").dialog({
                resizeable: false,
                height: 700,
                width: 1100,
                modal: true
            });
        }

        function createEditModal(index) {
            $scope.name = {};
            $scope.name.nameLabel = findPlayer(index);

            jQuery("#" + index + ".nameModal").dialog({
                resizeable: false,
                height: 200,
                width: 400,
                modal: true,
                buttons: {
                    "Cancel": function () {
                        jQuery(this).dialog("close");
                    },
                    "Ok": function () {
                        editPlayerName(index);
                        jQuery(this).dialog("close");
                    }
                }
            });
        }

        function createStoryModal(index) {
            $scope.story = {};
            $scope.story.description = $scope.game.story;
            $scope.story.title = $scope.game.storyTitle;
            $scope.story.keywords = "";
            if ($scope.game.keywords){
                for (var x = 0; x < $scope.game.keywords.length; x++){
                    if(x != $scope.game.keywords.length-1){
                        $scope.story.keywords = $scope.story.keywords + $scope.game.keywords[x] + ',';
                    }
                    else{
                        $scope.story.keywords = $scope.story.keywords + $scope.game.keywords[x];
                    }
                }
            }

            jQuery(".storyModal").dialog({
                resizeable: false,
                height: 500,
                width: 1000,
                modal: true,
                buttons: {
                    "Cancel": function () {
                        jQuery(this).dialog("close");
                    },
                    "Ok": function () {
                        editStory();
                        jQuery(this).dialog("close");
                    }
                }
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

        function editPlayerName(index) {
            var newPlayer = $scope.name.nameLabel;

            $scope.players[index] = newPlayer;
            $scope.game.playerNameArray = $scope.players;
            GameService.updateGame($scope.game).then(function (response){
            });
        }

        function editStory() {
            $scope.game.story = $scope.story.description;
            $scope.game.storyTitle = $scope.story.title;
            $scope.game.keywords = $scope.story.keywords.split(',');

            console.log($scope.game.keywords);

            GameService.updateGame($scope.game).then(function (response){
            });
        }

        function admin(){
            console.log(UserService.isAdmin($rootScope.currentUser));
            return UserService.isAdmin($rootScope.currentUser);
        }

        //TODO: PAUSE VIDEO ON CLOSE
    }
})();