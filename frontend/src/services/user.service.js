import axios from "axios";
import authHeader from "./auth-header";

const API_URL_MYPAGE = "http://localhost:8000/users/mypage/";
const API_URL_CENTER = "http://localhost:8000/center/";
const API_URL_STAR = "http://localhost:8000/scrap/center/";

const getUserInfo = () => {
  return axios
    .get(API_URL_MYPAGE, { headers: authHeader() })
    .then((response) => {
      return JSON.parse(response.data);
    })
}

const getDefaultCenter = (region) => {
  return axios
    .put(API_URL_CENTER, region, { headers: authHeader() })
    .then((response) => {
      return JSON.parse(response.data);  
    });
};

const getCenter = (region, center) => {
  return axios
    .put(API_URL_CENTER, {
      region, 
      center
    }, { headers: authHeader() })
    .then((response) => {
      return JSON.parse(response.data);
    })
};

const handlePad = (linerCounter, mediumCounter, largeCounter, overnightCounter) => {
  return axios({
    method: 'put',
    url: API_URL_MYPAGE,
    headers: authHeader(),
    data: {
      liner: linerCounter,
      medium: mediumCounter,
      large: largeCounter,
      overnight: overnightCounter
    }
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return JSON.parse(response.data);
  })
};

// ADD DELETE STAR
const handleStar = (star) => {
  return axios({
    method: 'put',
    url: API_URL_STAR,
    headers: authHeader(),
    data: {
      center: star
    }
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
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
