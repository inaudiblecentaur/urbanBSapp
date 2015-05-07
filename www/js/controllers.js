angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('LobbyCtrl', function($scope, $stateParams, $http) {

  $http.get('http://localhost:3000/gameData')
    .success(function(data, status, headers, config) {
      $scope.games = data;
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });

})

.controller('GameCtrl', function($scope, $stateParams, $http, Game, Players, facebook){

  var url = 'http://localhost:3000/gameData/';

  // playerinvite object contains input from user to invite
  $scope.invitations = [];

  // set index of game from hyperlink clicked in lobby
  var index = +[$stateParams['gameId']];

  // initially load page with available games
   $http.get(url)
    .success(function(data, status, headers, config) {

      $scope.gameData = data[index];
      $scope.getQuestion();
      $scope.getInvites();
    })
    .error(function(data, status, headers, config) {
      console.log(error)
  });


    $scope.getQuestion = function() {
      console.log($scope.gameData)
      var currentQuestion = Game.getQuestion();
      console.log(currentQuestion)
      $scope.gameData.currentQuestion = currentQuestion.question;
      $scope.gameData.currentAnswer = currentQuestion.answer;
    },

      $scope.getInvites = function() {
      
      var url = 'http://localhost:3000/invites'
      console.log('inviting players')
      $http.get(url)
        .success(function(data, status, headers, config) {
          console.log(data)
          var invites = [];
          data.forEach(function(player) {
            invites.push(player)
          });

          $scope.invitations = invites;
        })

        .error(function(data, status, headers, config) {
          console.log('error')
        });
    };


})

.controller('LoginCtrl', function ($scope, $state, facebook) {
    $scope.fbLogin = facebook.fbLogin;
    $scope.getLoginStatus = facebook.getLoginStatus;
    
  });
    // END FB Login