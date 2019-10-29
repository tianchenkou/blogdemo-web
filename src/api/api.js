import axios from 'axios';
// let base = 'http://127.0.0.1/api';
let base = 'http://127.0.0.1:8181';

export const requestLogin = params => { return axios.post(`${base}/TestForWoss/TestForLogin`, params).then(res => res.data) };
//请求博客所有的分类目录
export const requestCates = params => { return axios.get(`${base}/getAllCate`, params).then(res => res.data) };
//请求对应二级分类id的所有博客信息
export const requestBlogs = param => { return axios.get(`${base}/getBlogs/${param}`).then(res => res.data) };
//请求对应博客id的博客信息
export const requestBlog = param => { return axios.get(`${base}/getBlog/${param}`).then(res => res.data) };

//博客编辑接口
export const getMarkdownArticle = params => { return axios.get(`${base}/getArticle`,params).then(res => res.data) };
export const saveMarkdownArticle = params => { return axios.post(`${base}/saveArticle`,params).then(res => res.data) };
export const uploadImg = params => { return axios.post(`${base}/uploadImg`,params).then(res => res.data) };
//上传Markdown文件的接口
export const doUploadMD = `${base}/doUploadMd`;

//新建一个分类接口
export const setNewCate = params => { return axios.post(`${base}/setCate`,params).then(res => res.data) };

