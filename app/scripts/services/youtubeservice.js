'use strict';

/**
 * @ngdoc service
 * @name youtubePlaylistApp.youtubeService
 * @description
 * # youtubeService
 * Factory in the youtubePlaylistApp.
 */
angular.module('youtubePlaylistApp').factory('youtubeService',['$http', function ($http) {
    // Public API here

    var API = {
        url: 'https://www.googleapis.com/youtube/v3',
        params: {            
            key: 'AIzaSyDXL9mQZ1LaB-rNuIXUklXE2ZMZSlLT8Bg',
            maxResults: 20,
            part: 'snippet',
            type: 'video'
        }
    };

    return {
        search: function (query, order, maxResults) {
            var url = API.url + '/search/?q=' + query;
            url += (typeof order !== 'undefined') ? '&order=' + order : '&order=viewCount';
            url += parseParams(API.params);
            return $http.get(url);
        }
    };
}]);

function parseParams(obj) {
    var params = '';
    for (var p in obj) {
        if ((obj.hasOwnProperty(p)) && (obj[p] !== '')) {
            params += '&' + p + '=' + obj[p];
        }
    }
    return params;
}