angular.module('starter.services', ['ngResource', 'ngCookies'])

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

.factory('Game', function($http, $resource, Players, Questions) {

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
});


  // player -> object containing username, token, total score, profileImage
  //   Players.facebookId = { username: string, fbToken: string, totalScore: integer,
  // profileImage: string(url) }
