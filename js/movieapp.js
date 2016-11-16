var app = angular.module("movie-search", ["ui.router"]);

app.factory("MovieService", function($http) {
  var service = {};
  var API_KEY = "06700781243c60769490b4e1bc29685c";

  service.nowPlaying = function() {
    var url = "http://api.themoviedb.org/3/movie/now_playing";
    return $http({
      method: "GET",
      url: url,
      params: { api_key: API_KEY }
    });
  };

  service.movieDetails = function(movieID) {
    var url = "http://api.themoviedb.org/3/movie/" + movieID;
    console.log(url);
    return $http({
      method: "GET",
      url: url,
      params: { api_key: API_KEY }
    });
  };

  service.movieSearch = function(queryText) {
    var url = "http://api.themoviedb.org/3/search/movie";
    return $http({
      method: "GET",
      url: url,
      params: {
        api_key: API_KEY,
        query: queryText
       }
    });
  };

  return service;
});

app.controller("MainController", function($scope, $state) {
  $scope.search = function() {
    $scope.query = $scope.searchMovies;
    $state.go("search", { query: $scope.query } );
  };
});

app.controller("SearchController", function($scope, $stateParams, $state, MovieService) {
  var queryText = $stateParams.query;

  $scope.search = function() {
    $scope.query = $scope.searchMovies;
    $state.go("search", { query: $scope.query } );
  };

  MovieService.movieSearch(queryText).success(function(moviesFound) {
    // movies found
    $scope.api_results = moviesFound;
    $scope.movies = $scope.api_results.results;
    console.log($scope.movies);
  });

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
      templateUrl: "search_results.html",
      controller: "SearchController"
    });

    $urlRouterProvider.otherwise("/search");
});
