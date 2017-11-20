cakeApp.controller('addCakeController', function($rootScope, $scope, $state, cakeService) {

    $rootScope.$state = $state;

    // Get content from encoder.js
    $scope.content = $rootScope.content;

    // fix for angular being funny with scope and undeclared objects
    $scope.page = {};

    $scope.submit = function() {
    	cakeService.add($scope.page).then(function successCallback(response) {
	        $state.go("cakes");
	    }, function errorCallback(response) {
	        alert(response.data);
	    });
    };

    $scope.goBack = function() {
    	$state.go("cakes");
    };

});