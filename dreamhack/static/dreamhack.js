angular.module('dreamhack', ['ngTagsInput'])
.controller('mainCtrl', function($scope, $interval, $q) {
  $scope.startTime = 0;
  $scope.endTime = 0;
  $scope.stopped = true;
  $scope.form = {};
  $scope.correctForm = {
    professions: [
      {text: 'Sith Lord'},
    ],
    cities: [
      {text: 'Death Star'},
    ],
    first_name: 'Darth',
    last_name: 'Vader',
    email: 'darth.vader@gmail.com',
  };
  $scope.page = '';
  $scope.top5 = top5; // Global variable set in index.html

  $scope.interval = null;

  $scope.start = function() {
    $scope.form = {};

    $scope.stopped = false;
    $scope.startTime = new Date();
    $scope.endTime = new Date();
    $scope.interval = $interval(function() {
      $scope.endTime = new Date();
    }, 30);
    $('#startElement input').focus();
  };

  $scope.stop = function($event) {
    $scope.stopped = true;
    if ($scope.interval !== null) {
      $interval.cancel($scope.interval);
    }

    if (!angular.equals($scope.form, $scope.correctForm)) {
      $scope.page = 'errors';
      setTimeout(function() {
        $('#tryAgainButton').focus();
      });
      return;
    }

    if ($scope.top5.length >= 5 && $scope.time_ms() > $scope.top5[$scope.top5.length-1].score) {
      $scope.page = 'notGoodEnough';
      setTimeout(function() {
        $('#tryAgainButton2').focus();
      });
      return;
    }

    $scope.page = 'results';
    setTimeout(function() {
      $('input[name="time_ms"]').val($scope.endTime - $scope.startTime);
      $('input[name="name"]').focus();
    }, 10);
  }
  setTimeout(function() {
    $('#startButton').focus();
  });

  $scope.time_ms = function() {
    return ($scope.endTime - $scope.startTime) / 1000;
  };

  $scope.scorePlace = function() {
    var suffix = ['st', 'nd', 'rd'];
    var i;
    for(i = 0; i < $scope.top5.length; i++) {
      if ($scope.time_ms() < $scope.top5[i].score) {
        break;
      }
    }
    return (i + 1) + (i > 2 ? 'th' : suffix[i]);
  };

  $scope.loadProfessions = function(query) {
    return $q(function(success, error) {
      success([
        {text: 'Sith Lord'},
        {text: 'Jedi Knight'},
        {text: 'Padawan'},
        {text: 'Bounty Hunter'},
        {text: 'Storm Trooper'},
        {text: 'Rebel Soldier'},
      ]);
    });
  };

  $scope.loadCities = function(query) {
    return $q(function(success, error) {
      success([
        {text: 'Death Star'},
        {text: 'Tatooine'},
        {text: 'Mustafar'},
        {text: 'Hoth'},
        {text: 'Alderaan'},
      ]);
    });
  };

});
