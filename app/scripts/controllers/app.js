'use strict';

angular.module('holidayJs2013WhiteElephantApp')
	.controller('AppCtrl', [
		'$scope',
		'$rootScope',
		'$location',
		function ($scope,$rootScope,$location) {
			$rootScope.$on('$routeChangeError',function(event, current, previous, rejection){
				// Since we could have a route change error while viewing a page, lets be sure to change the route and show the error message.
				// NOTE: on the error page we are going to have a link to the homepage as it is always safe to go to the homepage
				$location.path('error');
				$location.search({error:rejection});
				$location.replace();
			});
		}
	]);
