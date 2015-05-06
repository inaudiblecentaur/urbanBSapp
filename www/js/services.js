angular.module('starter.services', ['ngCookies'])

// .factory('Question', function($resource) {
//   return $resource('http://localhost:3000/questions/:qId');
// })

// .factory('Player', function($resource) {
//   return $resource('http://localhost:3000/players/:facebookId');
// })

.factory('Players', function($http) {
  return {
    playersList: {
      henry: {username: 'henry mollman', fbToken: 'aaaa', totalScore: 0, profileImage: 'http://a1.mzstatic.com/us/r30/Purple5/v4/6c/6c/90/6c6c901c-d279-b2e3-4cd6-855381f05308/icon128.png', isDealer: true},
      kir: {username: 'kir jarchow', fbToken: 'bbbb', totalScore: 1, profileImage: 'url1', isDealer: false},
      kyle: {username: 'kyle shockey', fbToken: 'cccc', totalScore: 2, profileImage: 'url2', isDealer: false},
      raymond: {username: 'raymond luong', fbToken: 'dddd', totalScore: 3, profileImage: 'url3', isDealer: false}
    },
    storePlayer: function(obj) {
      console.log('testing http ' + obj)
      // Simple POST request example (passing data) :
      $http.post('http://localhost:3000/signup', obj)
        .success(function(data, status, headers, config) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('success http post')
      }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    console.log('error http post')
  });
    }
  } 
})

.factory('Questions', function($http) {
  return {
    '0': {question: 'Office Hit List', answer: 'a list of people with whom you work and whom you would also like to murder'},
    '1': {question: 'Barithmetic', answer: 'the math a younger girl does when she meets an older guy in a bar, where she finds how old she was when you were her age'},
    '2': {question: 'Thirst Trapping', answer: 'the act of looking very attractive to the opposing gender to lead them on to rejection'} 
  }
})

.factory('Game', function($http, Players, Questions) {

  return {

    invitePlayer: function(username) {
      console.log(username + " " + Players.playersList)
      if  (Players.playersList[username]) {
          return Players.playersList[username];
      }
        else return "Not found";
      },

    getQuestion: function() {
      var count = 0;
      return Questions[count++];
    }      
  }
})

.factory('facebook', function(Players, $http, $cookieStore) {
  
  return {
  // FB Login
    fbLogin: function () {
        FB.login(function (response) {
            if (response.authResponse) {
                getUserInfo();
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
                    console.log(Players.playersList)
                    Players.storePlayer({firstName: response.first_name, lastName: response.last_name, fbId: response.id, imageUrl: user.profilePic})
                    $state.go('dashboard');
 
                });
            });
        }
    },

    getLoginStatus: FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {

          console.log('response = ' + JSON.stringify(response))
          var uid = response.authResponse.userID;
          var accessToken = response.authResponse.accessToken;
      }

      else if (response.status === 'not_authorized') {
        console.log('not authorized')
        // the user is logged in to Facebook, 
        // but has not authenticated your app
      } 

      else {
        console.log('the user is not logged in');
      }
    })
  }
})


  // player -> object containing username, token, total score, profileImage
  //   Players.facebookId = { username: string, fbToken: string, totalScore: integer,
  // profileImage: string(url) }
