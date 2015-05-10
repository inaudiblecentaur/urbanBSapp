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

  $http.get('http://localhost:3000/listGames')
    .success(function(data, status, headers, config) {
      console.log(data)
      $scope.games = data;
    })
    .error(function(data, status, headers, config) {
      console.log(data);
    });

     

})

.controller('CreateCtrl', function($scope, $stateParams, $http, Game, Players, facebook) {

  $scope.invitedPlayers = [];
  $scope.gameObj = {};

  $scope.createGame = function() {

      var req = {
        method: 'POST',
         url: 'http://localhost:3000/addGame',
         headers: {
           'Content-Type': 'application/json',
         },

         data: {"name": $scope.gameObj.gameName, "gameId": 0, "players": $scope.playerList, "currentQuestion": "null", 
                "round": 0, "roundLimit": $scope.gameObj.roundLimit, "dealer": "null"}
        }

        console.log(req.data)

      $http(req)
        .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('success http post')
      }).
      error(function(data, status, headers, config) {
      console.log('error http post')

      });
    };


  $scope.getPlayers = function() {
      $http.get('http://localhost:3000/listUsers')
      .success(function(data, status, headers, config) {
        $scope.playerList = data;
      })
      .error(function(data, status, headers, config) {
        console.log(error)
      });
    };

    $scope.invitePlayer = function(fbId) {
      $scope.playerList.forEach(function(player) {
        if (player.fbId === fbId) {
          $scope.invitedPlayers.push(player);
        }
      });

    };

    $scope.getPlayers();
    

})

.controller('GameCtrl', function($scope, $stateParams, $http, Game, Players, facebook){

  var url = 'http://localhost:3000/listGames/';

  $scope.invitations = [];

  // side menu needed for inviting player during game
  $scope.invitePlayer = Game.invitePlayer;

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
      $http.get('http://localhost:3000/currentQuestion')
        .success(function(data, status, headers, config) {
          $scope.gameData.currentQuestion = data;
          console.log($scope.gameData)
    })
    .error(function(data, status, headers, config) {
      console.log(error)
  });

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