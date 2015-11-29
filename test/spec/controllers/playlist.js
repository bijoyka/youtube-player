'use strict';

describe('Controller: PlaylistCtrl', function () {

  // load the controller's module
  beforeEach(module('youtubePlaylistApp'));

  var PlaylistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlaylistCtrl = $controller('PlaylistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlaylistCtrl.awesomeThings.length).toBe(3);
  });
});
