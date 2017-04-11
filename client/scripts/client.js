var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'MovieServices', function($scope, MovieServices){
  $scope.getMovie = MovieServices.getMovie;
}]);

myApp.controller('TwoController', ['$scope', 'MovieServices', function($scope, MovieServices){
  $scope.movieFromServer = MovieServices.movieFromServer;
  $scope.movie = {};

  $scope.addFavorite = function(){
  $scope.movie = angular.copy($scope.movieFromServer.response.data);

  MovieServices.addFavorite($scope.movie);
  MovieServices.clearMovie(MovieServices.movieFromServer);
  };
}]);


myApp.controller('SaveFavController', ['$scope', 'MovieServices', function($scope, MovieServices){
  $scope.favMovie = MovieServices.favMovie;
}]);
myApp.factory('MovieServices', ['$http', function($http){
  var movieFromServer = {};
  var favMovie = [];

  return {
    movieFromServer : movieFromServer,
    favMovie : favMovie,
    getRequest : function(){
    $http.get('/movie').then(function(response){
      movieFromServer.response = response;
  });
},

 getMovie : function (movie){
  $http.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=full&r=json').then(function(response){
    movieFromServer.response = response;
    console.log(movieFromServer.response.data);
  });
},

 saveMovie : function (newMovie) {
    favMovie.push(movie);
    console.log(favMovie);
  },

 removeFavorite : function (movie) {
  movieFromServer.response = null;
    }
  };
}]);
