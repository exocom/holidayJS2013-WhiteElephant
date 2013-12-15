'use strict';

describe('Controller: LobbyCtrl', function () {

  // load the controller's module
  beforeEach(module('holidayJs2013WhiteElephantApp'));

  var LobbyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LobbyCtrl = $controller('LobbyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
