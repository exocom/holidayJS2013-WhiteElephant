'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('ErrorCtrl', [
		'$scope',
		'$routeParams',
		function ($scope, $routeParams) {
			if ($routeParams.error) {
				$scope.error = $routeParams.error;
			}
		}
	]);
