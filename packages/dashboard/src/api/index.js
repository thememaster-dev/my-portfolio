import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

const TOKEN = localStorage.getItem('jwtToken');

const headers = {
  headers: { Authorization: `bearer ${TOKEN}` },
};

export const authRegister = (body) => {
  return axios.post(`${API}/auth/register`, body);
};
