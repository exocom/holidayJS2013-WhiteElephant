'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('LobbyCtrl', [
		'$scope',
		'FBURL',
		'$firebase',
		'userId',
		'$cookies',
		'$location',
		function ($scope, FBURL, $firebase, userId, $cookies, $location) {
			$scope.user = $firebase(new Firebase(FBURL + '/users/' + userId));
			$scope.games = $firebase(new Firebase(FBURL + '/games').limit(20));
			$scope.createGame = function(){
				var game = $scope.games.$add({
					hostId: userId,
					usersId: [
						userId
					],
					status: 1
				},function(){
					$cookies.gameId = game.name();
					$location.path('game-room');
					$location.replace();
				});

			};
		}
	]);
