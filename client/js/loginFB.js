
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

function fbLogin() {
  FB.login(function(response) {
    if (response.authResponse) {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', {fields: 'name,email'}, function(response) {
        let email = response.email
        console.log(email);
        localStorage.setItem('emailUser', response.email)
        localStorage.setItem('nameUser', response.name)
        axios.post('/', {
        // token : response
      }, {
        headers: {
          accesstoken: localStorage.getItem('fbtoken'),
          id: response.id,
          name: response.name,
          email: response.email
        }
      })
      .then(token => {
        console.log(token);
        localStorage.setItem('servertoken', token)
      })
      .catch(err => {
        console.log(err);
      })
      window.location = 'wall.html'
      console.log('Good to see you, ' + response.name + '.');
     });
    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
  }, {
    scope: 'public_profile,email'
  });
}

function fbLogout() {
  FB.logout(response => {
    if (response) {
      console.log(response);
      window.location = 'login.html';
    } else {
      console.log(`error`);
    }
  })
}
