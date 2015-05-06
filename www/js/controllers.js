angular.module('starter.controllers', [])

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
.controller('LobbyCtrl', function($scope, $stateParams) {
  // for viewing purposes only, will be removed when functionality is added -Kir
  $scope.games = [
    {name: "Ray's game", id: 1, round: 2},
    {name: "Kyle's game", id: 2, round: 5},
    {name: "Kir's game", id: 3, round: 1},
    {name: "Henry's game", id: 4, round: 7}
  ];
  $scope.invitations = [
      {name: "Henry", id: 1, gameId: 5},
      {name: "Kyle", id: 2, gameId: 6}
    ];
})
.controller('GameCtrl', function($scope, $stateParams){
  $scope.name = "Example's game";
});
