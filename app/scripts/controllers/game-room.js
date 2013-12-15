'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('GameRoomCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
		console.log('GameRoom');

        var ref = new Firebase("https://hack-holiday-js.firebaseio.com/");
        var base = $firebase(ref);

		$scope.users = base.$child("users");
		$scope.presents = base.$child("presents");
		$scope.activeUsersId = null;

		$scope.addUserWithPresent = function (name) {
			var id = Math.floor(Math.random() * 100 + 1);
			var presentId = Math.floor(Math.random() * 100 + 1);
			$scope.presents.$add({
				id: presentId,
				userId: id,
				url: 'http://lorempixel.com/64/64/technics/'
			});

			$scope.users.$add({
				id: id,
				name: name,
				currentPresentsId: null,
				presentId: presentId
			});
		};
	}]);
