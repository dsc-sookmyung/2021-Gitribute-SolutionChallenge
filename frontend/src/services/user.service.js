import axios from "axios";
import authHeader from "./auth-header";

const API_URL_MYPAGE = "http://localhost:8000/users/mypage/";
const API_URL_CENTER = "http://localhost:8000/center/";
const API_URL_STAR = "http://localhost:8000/scrap/center/";
const API_URL_RANKINGS = "http://localhost:8000/chart/";
const API_URL_CHANGEPASSWORD = "http://localhost:8000/change_password";

const getUserInfo = () => {
  return axios({
    method: 'get',
    url: API_URL_MYPAGE,
    headers: authHeader(),
  })
  .then((response) => {
    if (response.data.token) {
      console.log("USER:"+JSON.stringify(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  })
}

const getDefaultCenter = (region) => {
  try {
    return axios({
      method: 'post',
      url: API_URL_CENTER+'defaultcenter/',
      headers: authHeader(),
      data: {
        area: region
      }
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;  
    })
  } 
  catch (error) {
    console.log(error);
  }
};

const getCenter = (region, center) => {
  try {
    return axios({
      method: 'post',
      url: API_URL_CENTER+'getcenter/',
      headers: authHeader(),
      data: {
        area: region,
        place: center
      }
    })
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
  }
  catch (error) {
    console.log(error);
  }
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
    return response.data;
  })
};

const padNumToCenter = (region, center, originalLiner, originalMedium, originalLarge, originalOvernight, linerCounter, mediumCounter, largeCounter, overnightCounter) => {
  return axios({
    method: 'put',
    url: API_URL_CENTER+'centerdef/',
    headers: authHeader(),
    data: {
      area: region,
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
    return response.data;
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
    console.log(JSON.stringify(response.data));
    return response.data;
  })
};

const getRankings = () => {
  return axios({
    method: 'get',
    url: API_URL_RANKINGS,
    headers: authHeader(),
  })
  .then((response) => {
    console.log(JSON.stringify(response.data));
    return response.data;
  })
}

const checkPassword = (currentPassword) => {
  return axios({
    method: 'post',
    url: API_URL_CHANGEPASSWORD,
    headers: authHeader(),
    data: {
      currentPassword: currentPassword
    }
  })
  .then((response) => {
    return response.date;
  })
}

const updatePassword = (newPassword) => {
  return axios({
    method: 'post',
    url: API_URL_CHANGEPASSWORD,
    headers: authHeader(),
    data: {
      newPassword: newPassword
    }
  })
  .then((response) => {
    return response.date;
  })
}

const updatePrivacy = (newUsername, isVisible) => {
  return axios({
    method: 'post',
    url: API_URL_MYPAGE,
    headers: authHeader(),
    data: {
      username: newUsername,
      visibility: isVisible
    }
  })
  .then((response) => {
    return response.date;
  })
}

export default {
  getUserInfo,
  getDefaultCenter,
  getCenter,
  padNumToCenter,
  padNumToMypage,
  handleStar,
  getRankings,
  checkPassword,
  updatePassword,
  updatePrivacy
};
