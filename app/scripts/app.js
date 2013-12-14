'use strict';

angular.module('holidayJs2013WhiteElephantApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase'
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
