'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('LobbyCtrl', ['$scope', '$firebase', function ($scope, $firebase) {
		// Create instance...
		var ref = new Firebase("https://hack-holiday-js.firebaseio.com/presents");

		$scope.presents = $firebase(ref);

		$scope.add = function () {
			$scope.presents.$add(
				{
					"id": 1,
					"userId": 1,
					"imageUrl": 'http://lorempixel.com/64/64/technics/'
				}
			);
		};


		// Add
		// $scope.users.$add({foo: "bar"});

		// Remove
		// $scope.users.$remove("foo");

		// Update
		// $scope.items.foo = "baz";
		// $scope.items.$save("foo");

		//GameRoom
		//  activeUserId
		//  user
		//  presents
		//      id
		//      userId
		//      imageUrl

		$scope.presents.$on("loaded", function () {
			console.log("Initial data received!");
		});

		$scope.presents.$on("change", function () {
			console.log("A remote change was applied locally!");
		});
	}]);
