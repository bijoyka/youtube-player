'use strict';

/**
 * @ngdoc function
 * @name youtubePlaylistApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the youtubePlaylistApp
 */
angular.module('youtubePlaylistApp').controller('SearchCtrl',['$scope','youtubeService',function ($scope, youtubeService) {

	$scope.videos = [];

	$scope.searchVideo = function(query){
		youtubeService.search(query).success(function(result) {
			console.log(result);
			if (result.items.length > 0) {
				$scope.videos = result.items;
			}
			else{
				$scope.videos.length = 0;
			}
		})
		.error(function(error) {
			console.log('There was an error: ' + error);
		});		
	};


	$scope.init = function(){		
	};

	$scope.init()	
}]);