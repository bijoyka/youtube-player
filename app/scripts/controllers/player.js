'use strict';

/**
 * @ngdoc function
 * @name youtubePlaylistApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the youtubePlaylistApp
 */
angular.module('youtubePlaylistApp').controller('PlayerCtrl',['$scope','Loki', function ($scope, Loki) {

	var db;
	$scope.videos = {};
	$scope.currentPlaylist = [];
	$scope.currentPlayingVideoId = null;
	$scope.playerVars = {
		'autoplay': 1,
		'controls': 1,
		'html5':1,
		'autohide': 0,
		'cc_load_policy' : 0,
		'iv_load_policy' : 3
	};

	$scope.$on('youtube.player.ready', function ($event, player) {
		console.log("Video Ready");
	});

	$scope.$on('youtube.player.ended', function ($event, player) {
		console.log("Video Ended, Loading Next Video From Playlist");

		var nextVideoIndex = 0;
		angular.forEach($scope.currentPlaylist, function(value, key){
			if(value.playing){
				nextVideoIndex = key + 1;
				value.playing = false;
			}
		});

		if(typeof $scope.currentPlaylist[nextVideoIndex] !== 'undefined'){
    		$scope.currentPlayingVideoId = $scope.currentPlaylist[nextVideoIndex].videoId;
    		$scope.currentPlaylist[nextVideoIndex].playing = true;			
		}

	});	

	$scope.$on('youtube.player.playing', function ($event, player) {
		console.log("Video Playing");

		if(player.getAvailableQualityLevels().indexOf("tiny") > -1){
			player.setPlaybackQuality('tiny');
		}
		else if(player.getAvailableQualityLevels().indexOf("small") > -1){
			player.setPlaybackQuality('small');
		}
		else{
			player.setPlaybackQuality('medium');
		}
	});	

	$scope.init = function(){
		// ---- Loki DB ---- //
		db = new Loki('youtube-playlist');
	    db.loadDatabase({}, function() {
			$scope.videos = db.getCollection('videos') || db.addCollection('videos');
	    });

	    angular.forEach($scope.videos.find(), function(value, key){
	    	$scope.currentPlaylist.push({
	    		'videoId' : value.videoId,
	    		'playing' :false
	    	});

	    	if(key === 0) {
	    		$scope.currentPlayingVideoId = $scope.currentPlaylist[0].videoId;
	    		$scope.currentPlaylist[0].playing = true;
	    	}
	    });
	};

	$scope.init();

}]);