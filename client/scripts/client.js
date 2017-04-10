var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'MovieServices', function($scope, MovieServices){
  $scope.movie = MovieServices.movie;
  $scope.findMovie = MovieServices.findMovie;
  $scope.clear = function() {
    $scope.movie = {};
  };
}]);

myApp.controller('TwoController', ['$scope', 'MovieServices', 'SearchingService', function($scope, MovieServices, SearchingService){
  $scope.searchResults = MovieServices.searchResults;
  $scope.saveMovie = SearchingService.saveMovie;
}]);

myApp.controller('SaveFavController', ['$scope', 'MovieServices', 'SearchingService', function($scope, MovieServices, SearchingService){
  $scope.movieListFav = SearchingService.movieListFav;
  SearchingService.showSavedMovies();
  console.log('searched movie');
  $scope.removeFavorite = SearchingService.removeFavorite;
}]);

myApp.factory('MovieServices', ['$http', function($http){
  var movie = {
    searchMovie: '',
  };
  var searchResults = {};
  function findMovie(movie){
    var copy = angular.copy[movie];
    $http.get('http://www.omdbapi.com/?t=' + movie.searchMovie).then(function(response) {
      searchResults.movie = response.data;
    });
  }
  return {
    movie : movie,
    findMovie : findMovie,
    searchResults : searchResults
  };
}]);


myApp.factory('SearchingService', ['$http', function($http){
  var movieList = [];
  var movieListFav = {
    movieList: movieList
  };

  function showSavedMovies() {
    $http.get('/movies').then(function(response) {
      movieListFav.movieList = response.data;
      console.log('movie is showing: ', movieListFav.movieList);
      });
    }//end showSavedMovies

  function saveMovie(newMovie) {
    var copy = angular.copy[newMovie];
    $http.post('/movies', newMovie.movie).then(function() {
      showSavedMovies();
      });
    }//end saveMovie

  function removeFavorite(index) {
    console.log(index);
    var removeID = movieListFav.movieList[index]._id;
    console.log(removeID);
    $http.delete('/movies/'+removeID).then(function() {
      showSavedMovies();
    });
    }

  return{
    saveMovie : saveMovie,
    showSavedMovies : showSavedMovies,
    movieListFav : movieListFav,
    removeFavorite : removeFavorite
  };
}]);
