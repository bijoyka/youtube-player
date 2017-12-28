'use strict';

/**
 * @ngdoc function
 * @name youtubePlaylistApp.controller:PlaylistCtrl
 * @description
 * # PlaylistCtrl
 * Controller of the youtubePlaylistApp
 */
angular.module('youtubePlaylistApp').controller('PlaylistCtrl',['$scope','Loki','youtubeService', function ($scope, Loki, youtubeService) {

	var db;
	$scope.videos = {};
	$scope.playlists = {};
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
	$scope.showVideo = false;
	$scope.searchResult = [];
	$scope.youtubeAPICalled = false;	

	/** Search **/
	$scope.playVideoSearch = function(videoId){
		$scope.currentPlayingVideoId = videoId;
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
	/** Search **/
	
	/** Video **/
	$scope.playVideo = function(videoId, index){
	    console.log("Video = ",$scope.videos.find()[index]);

	    angular.forEach($scope.videos.find(), function(value, key){
	    	if(value.playing) { value.playing = false;}
	    });	    

	    if(typeof $scope.videos.find()[index] !== 'undefined'){
			$scope.currentPlayingVideoId = $scope.videos.find()[index].videoInfo.id
			$scope.videos.find()[index].playing = true;
		}
	};

	$scope.getVideoForPlaying = function(){
		var nextVideoIndex = 0;

		if($scope.videos != null){
		    angular.forEach($scope.videos.find(), function(value, key){
		    	if(value.playing) { nextVideoIndex = key + 1; value.playing = false;}
		    });

		    console.log("Video = ",$scope.videos.find()[nextVideoIndex]);

		    if(typeof $scope.videos.find()[nextVideoIndex] !== 'undefined'){
				$scope.currentPlayingVideoId = $scope.videos.find()[nextVideoIndex].videoInfo.id
				$scope.videos.find()[nextVideoIndex].playing = true;
			}
		}
	};
	/** Video **/

	/** Playlist **/
	$scope.addToPlaylist = function(videoId, videoTitle, videoThumbnail){
		console.log(videoId, videoTitle, videoThumbnail);
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

	$scope.removeVideoFromPlaylist = function(videoObj){
		console.log("Remove video =" + videoObj);
		$scope.videos.remove(videoObj);
		db.saveDatabase();
	};

	$scope.removePlaylist = function(playlistObj){
		console.log("Remove playlist  =" + playlistObj);
		$scope.playlist.remove(playlistObj);
		db.saveDatabase();
	};

	$scope.createPlaylist = function(playlistName){
		var playlistNamePurified = playlistName.toLowerCase().split(' ').join('_');

		//check if playlist with the same name exists
		if($scope.playlists.find({'name' : playlistNamePurified}).length === 0){		
			$scope.playlists.insert({
				'name' : playlistNamePurified,
				'display_name' : playlistName,
				'is_active' : true
			});
			db.saveDatabase();
		}
	};


	/** Playlist **/

	$scope.$on('youtube.player.ready', function ($event, player) {
		console.log("Video Ready");
	});

	$scope.$on('youtube.player.ended', function ($event, player) {
		console.log("Video Ended, Loading Next Video From Playlist");
		$scope.getVideoForPlaying();
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
			$scope.playlists = db.getCollection('playlist') || db.addCollection('playlist');
	    });

	    console.log("$scope.videos", $scope.videos);
	    console.log("$scope.playlists", $scope.playlists);

	    if($scope.playlists.data.length === 0) { console.log("Empty playlist"); $scope.createPlaylist('default'); }

	    if($scope.videos != null) { $scope.currentPlaylist = $scope.videos.find(); }

	    $scope.getVideoForPlaying();
	};

	$scope.init();

}]);