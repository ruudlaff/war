cakeApp.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/cakes");
  $stateProvider
    .state('cakes', {
        url: "/cakes",
        templateUrl: "js/pages/cakeslist/cakeslist.html",
        controller: "cakesListController"
    })
    .state('add', {
        url: "/cakes/add",
        templateUrl: "js/pages/addcake/addcake.html",
        controller: "addCakeController"
    })
    .state('cake', {
        url: "/cakes/{id}",
        templateUrl: "js/pages/onecake/onecake.html",
        controller: "oneCakeController"
    });
});