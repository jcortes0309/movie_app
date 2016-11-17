var app = angular.module("movie-search", ["ui.router"]);

app.factory("Movie", function($http) {
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

  service.popular = function() {
    var url = "http://api.themoviedb.org/3/movie/popular";
    return $http({
      method: "GET",
      url: url,
      params: { api_key: API_KEY }
    });
  };

  service.upcoming = function() {
    var url = "http://api.themoviedb.org/3/movie/upcoming";
    return $http({
      method: "GET",
      url: url,
      params: { api_key: API_KEY }
    });
  };

  service.similar = function(movieID) {
    var url = "http://api.themoviedb.org/3/movie/" + movieID + "/similar";
    return $http({
      method: "GET",
      url: url,
      params: { api_key: API_KEY }
    });
  };

  service.recommendations = function(movieID) {
    var url = "http://api.themoviedb.org/3/movie/" + movieID + "/recommendations";
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

app.controller("MainController", function($scope, $state, Movie) {
  $scope.nowPlaying = function() {
    Movie.nowPlaying().success(function(movieResults) {
      // movie results
      $scope.api_results = movieResults;
      $scope.now_playing = $scope.api_results.results;
      console.log("Movie results: ", $scope.now_playing);
    });
  };

  $scope.popularMovies = function() {
    Movie.popular().success(function(popular) {
      // popular movies
      $scope.api_results = popular;
      $scope.popular = $scope.api_results.results;
      console.log("Popular movies: ", $scope.popular);
    });
  };

  $scope.upcomingMovies = function() {
    Movie.upcoming().success(function(upcoming) {
      // upcoming movies
      $scope.api_results = upcoming;
      $scope.upcoming = $scope.api_results.results;
      console.log("Popular movies: ", $scope.upcoming);
    });
  };

  $scope.search = function() {
    $scope.query = $scope.searchMovies;
    $state.go("search", { query: $scope.query } );
  };
});

app.controller("SearchController", function($scope, $stateParams, $state, Movie) {
  var queryText = $stateParams.query;

  $scope.search = function() {
    $scope.query = $scope.searchMovies;
    $state.go("search", { query: $scope.query } );
  };

  Movie.movieSearch(queryText).success(function(moviesFound) {
    // movies found
    $scope.api_results = moviesFound;
    $scope.movies = $scope.api_results.results;
    console.log($scope.movies);
  });

});

app.controller("DetailsController", function($scope, $stateParams, Movie) {
  var movieID = $stateParams.id;
  Movie.movieDetails(movieID).success(function(movieDetails) {
    // movie details
    $scope.movie_details = movieDetails;
    console.log($scope.movie_details);
  });

  Movie.similar(movieID).success(function(similarMovies) {
    // similar movies
    $scope.api_results = similarMovies;
    $scope.similar_movies = $scope.api_results.results;
    console.log($scope.similar_movies);
  });

  Movie.recommendations(movieID).success(function(recommendedMovies) {
    // recommended movies
    console.log("recommended movies from API: ", recommendedMovies);
    $scope.api_results = recommendedMovies;
    $scope.recommended_movies = $scope.api_results.results;
    console.log("recommended movies: ", $scope.recommended_movies);
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
    })
    .state({
      name: "movie",
      url: "/movie/{id}",
      templateUrl: "movie.html",
      controller: "DetailsController"
    });

    $urlRouterProvider.otherwise("/search");
});
