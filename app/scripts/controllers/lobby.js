'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('LobbyCtrl', [
		'$scope',
		'$cookies',
		'$location',
		'user',
		'games',
		function ($scope, $cookies, $location, user, games) {
			// CHECK TO SEE IF THE USER IS REGISTERED OR IS IN A GAME!
			if($cookies.userId && $cookies.gameId){
				$location.path('game-room/' + $cookies.gameId);
				$location.replace();
			}

			$scope.user = user;
			$scope.games = games;

			// TODO : if game is finished need a function to unset the gameId cookie and push user
			// back to the lobby, so they can join a different game

			$scope.createGame = function () {
				var player = {};
				player[$cookies.userId] = true;

				var game = $scope.games.$add({
					host: $cookies.userId,
					players: player,
					status: 1
				}, function () {
					$scope.$apply(function(){
						$cookies.gameId = game.name();
						$location.path('game-room/' + game.name());
						$location.replace();
					});
				});
			};
		}
	]);