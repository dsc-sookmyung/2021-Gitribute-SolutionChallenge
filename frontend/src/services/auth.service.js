import axios from "axios";

const API_URL = "http://localhost:8000/users/";

const register = (username, email, password, role, image) => {
  const data = new FormData();
  data.append('username', username);
  data.append('email', email);
  data.append('password', password);
  data.append('role', role);
  data.append('image', image);
  
  return axios.post(API_URL + "signup/", data);
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

const deleteAccount = (password, user) => {
  return axios
    .post(API_URL + "account", {
      password,
      user
    })
    .then((response) => {
      return response.data;
    })
}

const forgotPassword = (email) => {
  return axios
    .post(API_URL + "forgot", {
      email
    })
    .then((response) => {
      return response.date;
    })
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  deleteAccount,
  forgotPassword
};
