import axios from "axios";
import authHeader from "./auth-header";

const API_URL_MYPAGE = "http://localhost:8000/users/mypage/";
const API_URL_CENTER = "http://localhost:8000/center/";

const getUserInfo = () => {
  return axios
    .get(API_URL_MYPAGE, { headers: authHeader() })
    .then((response) => {
      return JSON.parse(response.data);
    })
}

const getDefaultCenter = (region) => {
  return axios
    .post(API_URL_CENTER, region, { headers: authHeader() })
    .then((response) => {
      return JSON.parse(response.data);  
    });
};

const getCenter = (region, center) => {
  return axios
    .post(API_URL_CENTER, {
      region, 
      center
    }, { headers: authHeader() })
    .then((response) => {
      return JSON.parse(response.data);
    })
};

const handlePad = (center, padCount) => {
  return axios
    .post(API_URL_MYPAGE, {
      center, 
      padCount
    }, { headers: authHeader() })
    .then((response) => {
      return JSON.parse(response.data);
    })
};

// ADD DELETE STAR
const handleStar = (star) => {
  return axios
    .post(API_URL_MYPAGE, star, { headers: authHeader() })
    .then((response) => {
      alert(response.data);
      return JSON.parse(response.data);
    })
};

export default {
  getUserInfo,
  getDefaultCenter,
  getCenter,
  handlePad,
  handleStar
};
