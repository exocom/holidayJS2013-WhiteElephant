'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('GameRoomCtrl', ['$scope', function ($scope) {
		console.log('here');
		$scope.awesomeThings = [
			'HTML5 Boilerplate',
			'AngularJS',
			'Karma'
		];
		$scope.users = [];
		$scope.presents = [];
		$scope.activeUsersId = null;

		$scope.addUserWithPresent = function (name) {
			var id = Math.floor(Math.random() * 100 + 1);
			var presentId = Math.floor(Math.random() * 100 + 1);
			$scope.presents.push({
				id: presentId,
				userId: id,
				url: ''
			});

			$scope.users.push({
				id: id,
				name: name,
				currentPresentsId: null,
				presentId: presentId
			});
		};
	}]);
