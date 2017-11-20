cakeApp.controller('oneCakeController', function($rootScope, $scope, $state, $stateParams, cakeService) {

    $rootScope.$state = $state;

    // Get content from encoder.js
    $scope.content = $rootScope.content;

    cakeService.getOne($stateParams.id).then(function successCallback(response) {
        $scope.page = response.data;
    }, function errorCallback(response) {
        alert(response.data);
    });

});