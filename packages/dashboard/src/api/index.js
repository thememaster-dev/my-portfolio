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

export const createProject = (body) => {
  return axios.post(`${API}/project`, body, headers);
};

export const editProject = (slug, body) => {
  return axios.put(`${API}/project/${slug}`, body, headers);
};

export const getPublishedPeoject = (slug) => {
  return axios.get(`${API}/project/published/${slug}`);
};
export const getPublishedPeojects = (page = 1) => {
  return axios.get(`${API}/project/published/page/${page}`);
};

export const getUnpublishedPeoject = (slug) => {
  return axios.get(`${API}/project/unpublished/${slug}`, headers);
};

export const getUnpublishedPeojects = (page = 1) => {
  return axios.get(`${API}/project/unpublished/page/${page}`, headers);
};
