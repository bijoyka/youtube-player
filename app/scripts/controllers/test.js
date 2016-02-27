'use strict';

/**
 * @ngdoc function
 * @name youtubePlaylistApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the youtubePlaylistApp
 */
angular.module('youtubePlaylistApp').controller('TestCtrl',['$scope','Loki', function($scope, Loki) {

    var db;

    $scope.users = {};
    $scope.user = {};

    // -------- Loki database instance ----------
    db = new Loki('testapp');

    // ------- Chargement collections --------
    db.loadDatabase({}, function() {
		// --- theUsers collection -----
		$scope.users = db.getCollection('users') || db.addCollection('users');
    });

    // ---------- Scope instance -------------
    // Ajout utilisateur
    $scope.addUser = function() {
		$scope.users.insert({
			firstname: $scope.user.firstname,
			name: $scope.user.name,
			email: $scope.user.email,
			age: $scope.user.age
		});
		$scope.user = {};
		db.saveDatabase();
    };

    $scope.collections = db.listCollections();
    console.log("$scope.collections =", $scope.collections);    

	$scope.init = function(){
	    angular.forEach($scope.users.find(), function(value, key){
	    	console.log(value);
	    });
	};

	$scope.init();	
}]);