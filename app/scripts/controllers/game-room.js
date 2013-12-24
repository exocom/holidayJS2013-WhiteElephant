'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('GameRoomCtrl', [
		'$scope',
		'FBURL',
		'$firebase',
		'userId',
		function ($scope, $firebase, FBURL, userId) {
			$scope.user = $firebase(new Firebase(FBURL + '/users/' + userId));
			$scope.userId = userId;

		}
	]);
