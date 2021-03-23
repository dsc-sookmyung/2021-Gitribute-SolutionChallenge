import axios from "axios";

const API_URL = "http://localhost:8000/users/";

const register = (username, email, password, role, image) => {
  return axios.post(API_URL + "signup/", {
    username,
    email,
    password,
    role,
    image
  });
};

const login = (email, password, remember) => {
  return axios
    .post(API_URL + "login/", {
      email,
      password,
      remember
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      
      return response.data;
    })
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
