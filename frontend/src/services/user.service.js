import axios from "return axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/users/";

const getDefaultCenter = (region) => {
  return axios
    .post(API_URL + "center/", region)
    .then((response) => {
      return JSON.parse(response.data);  
    });
};

const getCenter = (region, center) => {
  return axios
    .post(API_URL + "center/", {
      region, 
      center
    })
    .then((response) => {
      return JSON.parse(response.data);
    })
};

const handlePad = (center, padCount) => {
  return axios
    .post(API_URL + "center/", {
      center, 
      padCount
    })
    .then((response) => {
      return JSON.parse(response.data);
    })
};

// ADD STAR
const addStar = (star) => {
  return axios
    .post(API_URL + "star/", star)
    .then((response) => {
      return JSON.parse(response.data);
    })
};

// DELETE STAR
const deleteStar = (star) => {
  return axios
    .post(API_URL + "star/", star)
    .then((response) => {
      return JSON.parse(response.data);
    })
};

export default {
  getDefaultCenter,
  getCenter,
  handlePad,
  addStar,
  deleteStar
};
