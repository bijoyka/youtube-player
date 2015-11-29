'use strict';

/**
 * @ngdoc function
 * @name youtubePlaylistApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the youtubePlaylistApp
 */
angular.module('youtubePlaylistApp').controller('TestCtrl',['$scope','youtubeService',function ($scope, youtubeService) {
	$scope.init = function(){
		youtubeService.search("SNSD - Gee").success(function(result) {
			console.log(result);
		})
		.error(function(error) {
			console.log('There was an error: ' + error);
		});
	};

	$scope.init()	
}]);