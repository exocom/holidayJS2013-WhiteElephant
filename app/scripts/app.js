'use strict';

/*

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
		'ui.bootstrap.tabs',
		'angularFileUpload'
	])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			})
			.when('/game-room/:id', {
				templateUrl: 'views/game-room.html',
				controller: 'GameRoomCtrl',
				resolve: {
					user: [
						'$cookies',
						'$q',
						'$firebase',
						'FBURL',
						function ($cookies, $q, $firebase, FBURL) {
							if ($cookies.userId) {
								return $firebase(new Firebase(FBURL + '/users/' + $cookies.userId));
							} else {
								var deferred = $q.defer();
								deferred.reject('You have not yet signed up!');
								return deferred.promise;
							}
						}
					],
					game: [
						'$cookies',
						'$q',
						'$firebase',
						'FBURL',
						function ($cookies, $q, $firebase, FBURL) {
							if ($cookies.gameId) {
								return $firebase(new Firebase(FBURL + '/games/' + $cookies.gameId));
							} else {
								var deferred = $q.defer();
								deferred.reject('You have not yet signed up!');
								return deferred.promise;
							}
						}
					]
				}
			})
			.when('/lobby', {
				templateUrl: 'views/lobby.html',
				controller: 'LobbyCtrl',
				resolve: {
					// TODO : resolve if the user is in this specific game? Or should hitting this add them to the game?
					// TODO : IF NOT IN THIS GAME BUT IS A USER then add to game and continue?
					// NOTE : I am storing a cookie of the game you belong to so how about if they are not in that game and don't have cookie then we can fetch that game on the lobby page and say did you want to join this game?
					user: [
						'$cookies',
						'$q',
						'$firebase',
						'FBURL',
						function ($cookies, $q, $firebase, FBURL) {
							if ($cookies.userId) {
								return $firebase(new Firebase(FBURL + '/users/' + $cookies.userId));
							} else {
								var deferred = $q.defer();
								deferred.reject('You have not yet signed up!');
								return deferred.promise;
							}
						}
					],
					games: [
						'$firebase',
						'FBURL',
						function ($firebase, FBURL) {
							return $firebase(new Firebase(FBURL + '/games').limit(20));
						}
					]
				}
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
	.constant('FBURL', 'https://white-elephant.firebaseio.com');
