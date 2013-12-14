'use strict';

angular.module('holidayJs2013WhiteElephantApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
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
      .otherwise({
        redirectTo: '/'
      });
  }]);
