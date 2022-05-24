/* global google */
import React, { useState, useEffect } from "react";
import GoogleLogin /* , { GoogleLogout } */ from "react-google-login";
import "../App.css";
import Dashboard from "../Dashboard";

const Login = (props) => {
  
  console.log("[Login] "+sessionStorage.getItem('email'));

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [other, setOther] = useState(null);

  const onOneTapSignedIn = (response) => {
    console.log("Prompt onOneTapSignedIn");
    let userInfo   = {};
    let profileObj = response.profileObj;
    userInfo.name  = profileObj.name;
    userInfo.email = profileObj.email;

    if (userInfo.email === 'athirahsn.hassan@gmail.com') {
      setUserInfo({...userInfo});
      sessionStorage.setItem("email",userInfo.email);
    } else {
      setUserInfo({...userInfo});
      setIsSignedIn(true);
      console.log("[Login]Unauthorized access attempted by " + userInfo.name + "(" + userInfo.email + ")");
      window.alert("Your account is not authorized to access this page.")
      window.location.reload();
    }
  };

  const onSuccess = (res) => {
    let userInfo   = {};
    let profileObj = res.profileObj;
    userInfo.name  = profileObj.name;
    userInfo.email = profileObj.email;

    if (userInfo.email === 'athirahsn.hassan@gmail.com') {
      setUserInfo({...userInfo});
      sessionStorage.setItem("email",userInfo.email);
      window.location.reload();
    } else {
      setUserInfo({...userInfo});
      setIsSignedIn(true);
      console.log("[Login]Unauthorized access attempted by " + userInfo.name + "(" + userInfo.email + ")");
      window.alert("Your account is not authorized to access this page.")
      window.location.reload();
    }
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
  };

  useEffect(() => {
    window.onGoogleLibraryLoad = () => {
      google.accounts.id.initialize({
        client_id: "140281256136-sn8u0oviifv4smqdo1meltjv4n58bjrf.apps.googleusercontent.com",
        cancel_on_tap_outside: false,
        callback: onOneTapSignedIn,
      });
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log(notification.getNotDisplayedReason());
          setOther(1);
        } else if (notification.isSkippedMoment()) {
          console.log(notification.getSkippedReason());
          setOther(1);
        } else if (notification.isDismissedMoment()) {
          console.log(notification.getDismissedReason());
        } else {
          setOther(0);
        }
      });
      google.accounts.id.renderButton({
        type: "standard",
        client_id: "140281256136-sn8u0oviifv4smqdo1meltjv4n58bjrf.apps.googleusercontent.com",
        cancel_on_tap_outside: false,
        prompt_parent_id: "g_id_onload",
      });
    };
  });

  
  return (
    <div>
        <div>
            {other === 1 ? (
                <div>
                    {/* { if signed in: show page App, else show login button */
                    isSignedIn ? (
                        <div>
                            {/* {if correct account: grant access, else no access} */
                            userInfo.email === 'athirahsn.hassan@gmail.com' ? (
                              <div>
                                <Dashboard />
                              </div>
                            ) : ("")
                            }
                        </div>
                    ) : (
                        <div>
                          <div>
                            <h2><code>BIM Sign Bank Administrative Page</code></h2>
                          </div>
                          <div>
                          <GoogleLogin
                              clientId="140281256136-sn8u0oviifv4smqdo1meltjv4n58bjrf.apps.googleusercontent.com"
                              // uxMode="redirect"
                              onSuccess={onSuccess}
                              cookiePolicy={"single_host_origin"}
                              //isSignedIn={true}
                              theme="dark"
                              onFailure={onFailure}
                              buttonText="Sign in your account with Google"
                          />
                          </div>
                        </div>
                        )
                    } 

                </div>
            ) : (
              <div>
                <div>
                  <h2><code>-BIM Sign Bank Administrative Page</code></h2>
                </div>
              </div>
              )}
        </div>
   </div>
);
};

export default Login;