/* eslint no-unused-vars:0 */
/* global FB */

export default function fbService() {
  FB.login((response) => {
    if (response.authResponse) {
      console.log(`Access Token: ${response.authResponse.accessToken}`);
    } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  });

  FB.getLoginStatus((response) => {
    console.log('FACEBOOK getLoginStatus');
    console.log(response);

    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token
      // and signed request each expire
      const uid = response.authResponse.userID;
      const accessToken = response.authResponse.accessToken;
    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app

      FB.api(
        '/1862418377410891/likes',
        (responseApi) => {
          console.log('FACEBOOK response');
          console.log(responseApi);
          if (responseApi && !responseApi.error) {
            /* handle the result */
          }
        },
      );
    } else {
      // the user isn't logged in to Facebook.
    }
  });
}
