import { message } from "antd";
import axios from "axios";
import UserServicere from "../UserService/UserService"
export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
}

//http://10.10.1.216:8282/
export const config = {
  //base_server: "https://192.168.1.169:8085/api/",
  base_server: "https://localhost:8085/api/",
  image_path: "",
  version: 1,
};

export const request = async (url, method, param) => {

  var header = { 'Content-Type': 'application/json', "accept": "*/*" }
  if (param instanceof FormData) {
    header = {
      "Content-Type": "multipart/form-data",
      accept: "application/json",
    };
  }

  return axios({
    url: config.base_server + url,
    method: method,
    data: param,
    headers: {
      ...header,
     // Authorization: "Bearer " + getLocalAccessToken(),
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      var status = err.response?.status;
      if (status === 404) {
        message.error("Route Not Found!");
      }  else if (status === 500) {
        message.error(err.message);
      }else if (status === 401) {
        message.warning("401 Unauthorized!");
        UserServicere.doLogin()
      }
      else if(status === 403)
      {
        message.warning("You don't have permission to access this resource!");
      }
      else {
       // UserServicere.doLogin()
        message.error(err.message);
      }
      return false;
    })
    .finally(() => {
      console.log("Request completed");
    });
};

export const requestForReport = async (url, method, param) => {
  return axios({
    url: config.base_server+url,
    method: method,
    data: param,
    responseType: "blob",
    headers: {
      Authorization: "Bearer " + getLocalAccessToken(),
      'Content-Type': 'application/pdf', "accept": "application/json"
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      var status = err.response?.status;
      if (status === 404) {
        message.error("Route Not Found!");
      }  else if (status === 500) {
        message.error("Internal error server!");
      } 
      else if (status === 401) {
        //UserServicere.doLogin()
      }
      else if (status === 403) {
        message.error(err.message);
      }
      else {
        message.error(err.message);
      }
      return false;
    })
    .finally(() => {
      console.log("Request completed");
    });
};
