'use strict';

// TODO : Fork the angular-camera project
// FORK
/*
	1. Add the $sce allow
	2. Add the $on $destroy to free the camera
	3. Create a bootstrap-branch, change the classes and add btnText to be 2 way
	4. Added disabled state during countdown
	5.
*/

// TODO : Install the angular-ui bootstrap


angular.module('holidayJs2013WhiteElephantApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'omr.directives'
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
