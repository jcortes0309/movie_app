var app = angular.module("movie-search", ["ui.router"]);

app.controller("MainController", function($scope, $stateParams, $state) {
  $scope.search = function() {
    $scope.query = $scope.searchMovies;
    // $scope.pageName = $stateParams.page_name;

    $state.go("search", { query: $scope.pageName } );

    console.log("Hit enter in the search input with value of: ", $scope.query);
  };
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: "home",
      url: "/search",
      templateUrl: "search.html",
      controller: "MainController"
    })
    .state({
      name: "search",
      url: "/search/{query}",
      templateUrl: "search_results.html"
    });

    $urlRouterProvider.otherwise("/search");
});
