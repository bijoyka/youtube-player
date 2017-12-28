'use strict';

/**
 * @ngdoc function
 * @name youtubePlaylistApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the youtubePlaylistApp
 */
angular.module('youtubePlaylistApp').controller('TestCtrl',['$scope','$firebaseObject', '$firebaseArray',
	function($scope, $firebaseObject, $firebaseArray) {

	var ref = new Firebase("https://glaring-torch-4485.firebaseio.com");
	$scope.playlists = [];
	$scope.videos_for_playlists = [];
	$scope.video = [];


	$scope.init = function(){
		/*var playlists = $firebaseArray(ref.child('users_playlists').child('superman'));

		playlists.$loaded()
			.then(function() {
				angular.forEach(playlists, function(value, key){
					console.log('Playlist Id - ' + value.$value);
					$scope.playlists.push(value.$value);

					var videos_for_playlists = $firebaseArray(ref.child('videos_for_playlists').child(value.$value));
					videos_for_playlists.$loaded()
						.then(function(){
							angular.forEach(videos_for_playlists, function(value_video, key_video){
								console.log('Video Id - ' + value_video.$value);
								$scope.videos_for_playlists.push(value_video.$value);

								var video = $firebaseObject(ref.child('videos').child(value_video.$value));
								video.$loaded()
									.then(function() {
										console.log(video);
										$scope.video.push(video);
									})//video - promise
									.catch(function(err) {
										console.error(err);
									});
							});							
						})//videos_for_playlist - promise
						.catch(function(err) {
							console.error(err);
						});
				});
			})//playlist - promoe
			.catch(function(err) {
				console.error(err);
			});*/

		var ref = new Firebase("https://glaring-torch-4485.firebaseio.com/user/b");
		/*var obj = $firebaseObject(ref);
		obj.users_playlists.batman = {
			'id'        : 3,
			'username'  : 'batman',
			'password'  : 'batman',
			'created_on': '2016-03-11'
		}
		obj.$save().then(function(adds) {
			adds.key() === obj.$id; // true
		}, function(error) {
			console.log("Error:", error);
		});*/

		var list = $firebaseArray(ref);
		/*var obj ={
				'batman' : {
					'id' : 3,
					'username' : 'batman'
				}
			};

		list.$add(obj);*/
		console.log( list.$indexFor("batman") );
	};

	$scope.init();	
}]);