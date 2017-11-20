cakeApp.controller('cakesListController', function($rootScope, $scope, $state, cakeService) {

    $rootScope.$state = $state;

    // Get content from encoder.js
    $scope.content = $rootScope.content;

    cakeService.getAll().then(function successCallback(response) {
        $scope.page = response.data;
    }, function errorCallback(response) {
        alert(response.data);
    });

});