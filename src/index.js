import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserService from "./UserService/UserService";
import keycloak from "./UserService/keycloak.js";
import axios from "axios"; 

const storedToken = localStorage.getItem("access_token");
const storedRefreshToken = localStorage.getItem("refresh_token");

const url = "http://localhost:8085/api/"
// const url2 = "http://10.10.1.216:8282/api/"
// const _axios = axios.create({ baseURL: url2 });
// _axios.interceptors.request.use((config) => {
//   if (UserService.isLoggedIn()) {
//     const cb = () => {
//       config.headers.Authorization = `Bearer ${UserService.getToken()}`;
//       return Promise.resolve(config);
//     };
//     return UserService.updateToken(cb);
//   }
// });

keycloak
  .init({
    onLoad: "check-sso", // check-sso | login-required
    KeycloakResponseType: "code",
    silentCheckSsoRedirectUri:window.location.origin + "/silent-check-sso.html",
    checkLoginIframe: false,
    pkceMethod: "S256",
    token: storedToken,
    refreshToken: storedRefreshToken,
  })
  .then((authenticated) => {
    if (!authenticated) {
      console.log("user is not authenticated..!");
      
    }

    localStorage.setItem("access_token", UserService.getToken());
    localStorage.setItem("refresh_token", keycloak.refreshToken);
    keycloak
      .updateToken(60)
      .then(function (refreshed) {
        if (refreshed) {
          console.log("Token refreshed..!");
        } else {
          
        }
      })
      .catch(function () {
        UserService.doLogin();
        
      });
    // setTimeout(() => {}, 20 * 60 * 1000);

    // if the access token is due to expire within the next 80 seconds refresh it

    // axios.interceptors.request.use((config) =>
    // keycloak
    //   .updateToken(60)
    //   .then(() => {
    //     config.headers.Authorization = "Bearer " + keycloak.token;
    //     return Promise.resolve(config);
    //   })
    //   .catch((err)=>{
    //       console.log(err)
    //       UserService.doLogin()
    //   }
    //   )
    // );

    console.log("'user is authenticated..!");
  });


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
reportWebVitals();
