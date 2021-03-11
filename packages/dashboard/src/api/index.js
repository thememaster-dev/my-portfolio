import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const TOKEN = localStorage.getItem('jwtToken');

const headers = {
  headers: { Authorization: `${TOKEN}` },
};

export const authRegister = (body) => {
  return axios.post(`${API}/auth/register`, body);
};

export const authLogin = (body) => {
  return axios.post(`${API}/auth/login`, body);
};

export const meCheck = () => {
  return axios.get(`${API}/auth/me`, headers);
};
