import axios from "axios";
import authHeader from "./auth-header";

const API_URL_MYPAGE = "http://localhost:8000/users/mypage/";
const API_URL_CENTER = "http://localhost:8000/center/";
const API_URL_STAR = "http://localhost:8000/scrap/center/";

const getUserInfo = () => {
  return axios({
    method: 'get',
    url: API_URL_MYPAGE,
    headers: authHeader(),
  })
  .then((response) => {
    if (response.data.token) {
      alert("USER:"+JSON.stringify(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.reload();
    }
    return JSON.parse(response.data);
  })
}

const getDefaultCenter = (region) => {
  return axios({
    method: 'post',
    url: API_URL_CENTER+'defaultcenter/',
    headers: authHeader(),
    data: {
      area: region
    }
  })
  .then((response) => {
    // console.log("de: "+JSON.stringify(response.data));
    return JSON.parse(response.data);
  })
};

const getCenter = (region, center) => {
  return axios({
    method: 'post',
    url: API_URL_CENTER+'defaultcenter/',
    headers: authHeader(),
    data: {
      place: region,
    }
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return JSON.parse(response.data);
  })
};

const padNumToMypage = (linerCounter, mediumCounter, largeCounter, overnightCounter) => {
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

const padNumToCenter = (center, originalLiner, originalMedium, originalLarge, originalOvernight, linerCounter, mediumCounter, largeCounter, overnightCounter) => {
  return axios({
    method: 'put',
    url: API_URL_CENTER+'centerdef/',
    headers: authHeader(),
    data: {
      place: center,
      originalLiner: originalLiner, 
      originalMedium: originalMedium, 
      originalLarge: originalLarge, 
      originalOvernight: originalOvernight,
      linerCounter: linerCounter,
      mediumCounter: mediumCounter,
      largeCounter: largeCounter,
      overnightCounter: overnightCounter
    }
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return JSON.parse(response.data);
  })
}

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
    alert(JSON.stringify(response.data));
    return JSON.parse(response.data);
  })
};

export default {
  getUserInfo,
  getDefaultCenter,
  getCenter,
  padNumToCenter,
  padNumToMypage,
  handleStar
};
