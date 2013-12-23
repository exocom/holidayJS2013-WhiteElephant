'use strict';

// TODO : Fork the angular-camera project
// FORK
/*
 1. Add the $sce allow
 2. Add the $on $destroy to free the camera
 3. Create a bootstrap-branch, change the classes and add btnText to be 2 way
 4. Added disabled state during countdown

 Just need to save the user object from mainCtrl to firebase and then push $location to lobby so they can start a game or join a game
 ALSO need a way to store a game reference, so some starts a game and wants you go join, you should hit the game-room then it should pass a :id into the url and redirect you to home page, once you sign up you get pushed back to that spcific game.
 NOTE : could also store your spot in that game as soon as you hit the url, that way no one can steal your spot


 */

// TODO : Install the angular-ui bootstrap


angular.module('holidayJs2013WhiteElephantApp', [
		'ngCookies',
		'ngResource',
		'ngSanitize',
		'ngRoute',
		'firebase',
		'omr.directives',
		'ui.bootstrap.transition',
		'ui.bootstrap.progressbar',
		'ui.bootstrap.tabs'
	])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/game-room', {
				templateUrl: 'views/game-room.html',
				controller: 'GameRoomCtrl'
			})
			.when('/lobby', {
				templateUrl: 'views/lobby.html',
				controller: 'LobbyCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
	}]);
