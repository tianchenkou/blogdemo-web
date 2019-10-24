import axios from 'axios';
let base = 'http://127.0.0.1:8181';
export const requestLogin = params => { return axios.post(`${base}/TestForWoss/TestForLogin`, params).then(res => res.data) };
export const requestCates = params => { return axios.get(`${base}/getAllCate`, params).then(res => res.data) };
export const requestBlogs = param => { return axios.get(`${base}/getBlogs/${param}`).then(res => res.data) };
