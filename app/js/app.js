var cakeApp = angular.module('cakeApp', ['ui.router', 'ngAnimate', 'ngCookies', 'ng-fastclick', 'angular.filter', 'templates']);

//Setting up for cacheing templates
angular.module('templates', []);

cakeApp.controller('cakeController', function($window, $scope, $rootScope, $state, $cookies) {

    /* To control appearance of loading screen. Will hide all other clickable elements. */
    $rootScope.loadingnow = false; 
    $rootScope.loadingMessage = "Loading encoder..."; /* Loading message to allow customisation. */

    // This section is used to set $rootScope.content to language based files.
    $rootScope.content = l10n.en;

});