var app = angular.module('musicApp', ["ngRoute"]);
app.config(function($routeProvider) {
  $routeProvider.when("/items", {
      templateUrl: "view-list.html",
      controller: "listController"
    })
    .when("/items/add", {
      templateUrl: "view-detail.html",
      controller: "addController"
    })
    .when("/items/:index", {
      templateUrl: "view-detail.html",
      controller: "editController"
    })
    .otherwise({
      redirectTo: "/items"
    });
});

app.factory('musicService', ['$rootScope', function($rootScope) {
  var svc = {};

  var data = [{
    name: "Group Love",
    genre: "Alternative",
    rating: "4"
  }, {
    name: "The Beatles",
    genre: "Rock",
    rating: "5"
  }, {
    name: "The Cure",
    genre: "New Wave",
    rating: "4"
  }, {
    name: "One Direction",
    genre: "Modern",
    rating: "4"
  }];

  svc.getArtists = function() {
    return data;
  };

  svc.addArtist = function(artist) {
    data.push(artist);
  };

  svc.editArtist = function(index, artist) {
    data[index] = artist;
  };

  return svc;
}]);

app.controller('listController', ['$scope', '$location', '$routeParams', 'musicService', function($scope, $location, $routeParams, musicService) {

  $scope.data = musicService.getArtists();

  $scope.addArtist = function() {
    $location.path("/items/add");
  };
  $scope.editItem = function(rofa) {
    $location.path("/items/" + rofa);
  };

}]);
app.controller('addController', ['$scope', '$location', '$routeParams', 'musicService', function($scope, $location, $routeParams, musicService) {
  $scope.save = function() {
    musicService.addArtist({name: $scope.Item.name, genre: $scope.Item.genre, rating: $scope.Item.rating});
    $location.path("/items");

  };
  $scope.cancel = function() {
    $location.path("/items");

  };
}]);
app.controller('editController', ['$scope', '$location', '$routeParams', 'musicService', function($scope, $location, $routeParams, musicService) {

  $scope.Item = musicService.getArtists()[parseInt($routeParams.index)];
   
  $scope.item = function() {

  };
  $scope.save = function() {
    musicService.editArtist(parseInt($routeParams.index), {name: $scope.Item.name, genre: $scope.Item.genre, rating: $scope.Item.rating});

    $location.path("/items");

  };
  $scope.cancel = function() {
    $location.path("/items");

  };

}]);