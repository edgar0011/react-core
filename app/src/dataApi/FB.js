/* eslint no-unused-vars:0 */
/* global FB */
/* global window */

export function fbLoaded() {
  return new Promise((resolve, reject) => {
    function resolver() {
      if (global.FB || window.FB) {
        return true;
      }
      return false;
    }
    if (!resolver()) {
      const maxTimeToWait = 10000;
      const time = Date.now();
      const it = setInterval(() => {
        if (resolver()) {
          resolve(global.FB || window.FB);
          clearInterval(it);
        } else if (Date.now() - time >= maxTimeToWait) {
          clearInterval(it);
          reject('FB not inited, exceeded max time to wait.');
        }
      }, 100);
    } else {
      resolve(global.FB || window.FB);
    }
  });
}

export default function fbService() {
  function callApi(token, path = '/me', fields = 'id,picture,email,link,name,photos,events,posts,friends') {
    return new Promise((resolve, reject) => {
      FB.api(path, 'GET', { access_token: token, fields }, (responseApi) => {
        resolve(responseApi);
        /* FB.ui(
        {
          method: 'share',
          href: 'https://developers.facebook.com/docs/',
        },
        // callback
        function(response) {
          if (response && !response.error_message) {
            alert('Posting completed.');
          } else {
            alert('Error while posting.');
          }
        }
      ); */
      });
    });
  }

  function callAPis(token) {
    return Promise.all([
      callApi(token),
      callApi(token, '/me/photos', ''),
      callApi(token, '/me/photos/uploaded', ''),
    ]).then((response) => {
      console.log('me');
      console.log(response[0]);
      console.log('photos');
      console.log(response[1]);
      console.log('photos/uploaded');
      console.log(response[2]);
    });
  }


  function init() {
    FB.getLoginStatus((loginStatusResponse) => {
      console.log('FACEBOOK getLoginStatus');
      console.log(loginStatusResponse);

      if (loginStatusResponse.status === 'connected') {
        /* FB.logout(function(response) {
          console.log(response);
        });
        return; */
        // the user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token
        // and signed request each expire
        const uid = loginStatusResponse.authResponse.userID;
        const accessToken = loginStatusResponse.authResponse.accessToken;
        callAPis(accessToken);
      } else {
        FB.login((response) => {
          if (response.authResponse) {
            console.log(`Access Token: ${response.authResponse.accessToken}`);
            const accessToken = response.authResponse.accessToken;
            callAPis(accessToken);
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        }, {
          scope: 'publish_actions,public_profile,email,user_photos,user_posts,user_events,user_friends',
          return_scopes: true,
        });
      }
    });
  }
  fbLoaded().then(init);
}

