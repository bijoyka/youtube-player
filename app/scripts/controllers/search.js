'use strict';

/**
 * @ngdoc function
 * @name youtubePlaylistApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the youtubePlaylistApp
 */
angular.module('youtubePlaylistApp').controller('SearchCtrl',['$scope','youtubeService','Loki',
	function ($scope, youtubeService, Loki) {

	$scope.searchResult = [];
	$scope.youtubeAPICalled = false;
	$scope.currentPlayingVideoId = null;
	$scope.playerVars = {
		'autoplay': 1,
		'controls': 1,
		'html5':1,
		'autohide': 0,
		'cc_load_policy' : 0,
		'iv_load_policy' : 3
	};

	var db;
	$scope.videos = {};
	
	
	/** Search **/
	$scope.playVideo = function(videoId){
		$scope.currentPlayingVideoId = videoId;
	};

	$scope.addToPlaylist = function(videoId, videoTitle, videoThumbnail){
		$scope.videos.insert({
			'videoInfo' : {
				'id' : videoId,
				'title' : videoTitle,
				'thumbnail' : videoThumbnail
			},
			'playing' : false
		});
		db.saveDatabase();
	};

	$scope.searchVideo = function(query){
		youtubeService.search(query).success(function(result) {
			$scope.youtubeAPICalled = true;
			if (result.items.length > 0) {
				$scope.searchResult = result.items;
			}
			else{
				$scope.searchResult.length = 0;
			}
		})
		.error(function(error) {
			$scope.youtubeAPICalled = true;
			console.log('There was an error: ' + error);
		});		
	};

	$scope.$on('youtube.player.ready', function ($event, player) {
		console.log("Video Ready");
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
	};

	$scope.init();	
}]);