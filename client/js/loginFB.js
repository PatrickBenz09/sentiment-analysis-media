
axios.defaults.baseURL = 'http://localhost:3000/signin';

window.fbAsyncInit = function() {
FB.init({
  appId      : '311509492641739',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
});

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  // console.log('masuk sdk facebokk');
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
  // console.log('statusChangeCallback');
  // console.log(response);
  if (response.status === 'connected') {
    // console.log(response);
    let token = response.authResponse.accessToken
    localStorage.setItem('fbtoken', token)
    // window.location = 'index.html'
    // tokenFB(token)
    // testAPI();
    console.log(`masuk response`);
  } else {
    console.log(`please login first`);
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function sendToken(token) {
  axios.post('')
}

function fbLogin() {
  FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     FB.api('/me', {fields: 'name,email'}, function(response) {       
       console.log(response);
       console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    scope: 'public_profile,email'
  });
}
