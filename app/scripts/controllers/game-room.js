'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('GameRoomCtrl', [
		'$scope',
		'$cookies',
		'user',
		'game',
		'$firebase',
		'FBURL',
		function ($scope,$cookies,user,game,$firebase,FBURL) {
			$scope.users = {};
			$scope.availablePresents = []; // An array so we can randomize it

			$scope.user = user;
			$scope.user.id = $cookies.userId;

			$scope.game = game;

			$scope.$watch('game.players',function(newVal){
				var playerCount = 0;
				angular.forEach($scope.game.players,function(v,k){
					if(!$scope.users[k]){
						$scope.users[k] = $firebase(new Firebase(FBURL+'/users/'+k));
						$scope.availablePresents.push(k);
					}
					playerCount++;
				});
				if(playerCount === 6){
					$scope.game.$set({status:2});
					$scope.start();
				}
			},true);

			$scope.start = function(){
				// Randomize the gifts,
				// Then set the first player to go ORDER is clockwise
			};
		}
	]);
