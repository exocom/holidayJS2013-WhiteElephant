'use strict';

describe('Directive: canvasCombineImg', function () {

  // load the directive's module
  beforeEach(module('holidayJs2013WhiteElephantApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<canvas-combine-img></canvas-combine-img>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the canvasCombineImg directive');
  }));
});
