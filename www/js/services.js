
angular.module('starter.services', ['ngCookies'])

// .factory('Question', function($resource) {
//   return $resource('http://urbanbs.herokuapp.com/questions/:qId');
// })

// .factory('Player', function($resource) {
//   return $resource('http://urbanbs.herokuapp.com/players/:facebookId');
// })

.factory('Players', function($http) {
  
  return {

    storePlayer: function(obj) {

      var req = {
        method: 'POST',
         url: 'http://urbanbs.herokuapp.com/signup',
         headers: {
           'Content-Type': 'application/json',
         },
         data: obj
        }

      $http(req)
        .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('success http post')
      }).
      error(function(data, status, headers, config) {
      console.log('error http post')
      });
    },
  }

})

.factory('Game', function($http, Players) {

  return {

    invitePlayer: function(id, playerList) {
      console.log(id)
      if (typeof id === "number") console.log('number');
      else if (typeof id === "string") {
        if  (playerList[id]) {
            return playerList[id];
        }
          else return "Not found";
        }
      },

    // getQuestion: function() {

    // },

    invitePlayer: function(fbId) {
      console.log($scope.playerList);
      $scope.playerList.forEach(function(player) {
        if (player.fbId === fbId) {
          player.answer = null;
          var req = {
            method: 'POST',
            url: 'http://urbanbs.herokuapp.com/invitePlayer',
            headers: {
              'Content-Type': 'application/json',
            },
            data: player
          }

          $http(req)
            .success(function(data, status, headers, config) {
            // this callback will be called asynchronously
            // when the response is available
              console.log('success http post')
            }).
            error(function(data, status, headers, config) {
              console.log('error http post')
            });
        }

      });
    }
   
  }
})

.factory('Create', function($http, Players) {
  return {}
    
})

.factory('facebook', function(Players, $http, $cookieStore, $state) {
  
  return {
  // FB Login
    fbLogin: function () {
        FB.login(function (response) {
            if (response.authResponse) {
                getUserInfo();
                $state.go('app.lobby');
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email,user_photos,user_videos'});
 
        function getUserInfo() {
            // get basic info
            FB.api('/me', function (response) {
                console.log('Facebook Login RESPONSE: ' + angular.toJson(response));
                // get profile picture
                FB.api('/me/picture?type=normal', function (picResponse) {
                    console.log('Facebook Login RESPONSE: ' + picResponse.data.url);
                    response.imageUrl = picResponse.data.url;
                    // store data to DB - Call to API
                    // Todo
                    // After posting user data to server successfully store user data locally
                    var user = {};
                    user.name = response.name;
                    user.email = response.email;
                    if(response.gender) {
                        response.gender.toString().toLowerCase() === 'male' ? user.gender = 'M' : user.gender = 'F';
                    } else {
                        user.gender = '';
                    }
                    user.profilePic = picResponse.data.url;
                    $cookieStore.put('userInfo', user);
                    Players.storePlayer({firstName: response.first_name, lastName: response.last_name, fbId: response.id, imageUrl: user.profilePic})
                    if(typeof localStorage != "undefined") {
                      alert("This place has local storage!");
                      localStorage.setItem(response.first_name, response.id);
                    }
                    else
                    {
                        alert("No local storage here");
                        document.cookie = c_name + "=" + escape(value);
                        // ((expiredays === null) ? "" : ";expires=" + exdate.toUTCString());
                    }
                    $state.go('app.lobby')
 
                });
            });
        }
    },
   
  }
})


  // player -> object containing username, token, total score, profileImage
  //   Players.facebookId = { username: string, fbToken: string, totalScore: integer,
  // profileImage: string(url) }

