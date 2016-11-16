var app = angular.module("movie-search", ["ui.router"]);



app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: "home",
      url: "/"
      // templateUrl: "home.html",
      // controller: "HomeController"
    });

    $urlRouterProvider.otherwise("/");
});
