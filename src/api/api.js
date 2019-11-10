import axios from 'axios';
import Vue from '../main';
// let base = 'http://127.0.0.1/api';
// let base = 'http://127.0.0.1:8181';
axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
    config => {
      if (localStorage.getItem('Authorization')) {
        config.headers.Authorization = localStorage.getItem('Authorization');
      }
   
      return config;
    },
    error => {
      return Promise.reject(error);
    });

//http response 拦截器
axios.interceptors.response.use(
  response => {
      return response;
  },
  error => {
      if (error.response) {
        // console.log(error.response.data.message);
          //TODO 这里将message该为code 后端
          // switch (error.response.data.message) {
              // case '401':
                  // 返回 401 清除token信息并跳转到登录页面
                  Vue.$store.commit("logout");
                  // Vue.$router.push({ path: "/login" });
          // }
      }
      return Promise.reject(error.response.data)   // 返回接口返回的错误信息
});

axios.defaults.timeout = 5000;

export const requestLogin = params => { return axios.post(`/login`, params).then(res => res.data) };
export const requestVImg = params => { return axios.post(`/captcha`, params).then(res => res.data) };

//请求博客所有的分类目录
export const requestCates = params => { return axios.get(`/getAllCate`, params).then(res => res.data) };
//请求对应二级分类id的所有博客信息
export const requestBlogs = param => { return axios.get(`/getBlogs/${param}`).then(res => res.data) };
//请求对应博客id的博客信息
export const requestBlog = param => { return axios.get(`/getBlog/${param}`).then(res => res.data) };

//博客编辑接口
export const saveMarkdownArticle = params => { return axios.post(`/saveArticle`,params).then(res => res.data) };
export const uploadImg = params => { return axios.post(`/uploadImg`,params).then(res => res.data) };
//上传Markdown文件的接口
// export const doUploadMD = `${base}/doUploadMd`;

//新建一个分类接口
export const setNewCate = params => { return axios.post(`/setCate`,params).then(res => res.data) };

//评论模块
export const getAllCommentData = param => { return axios.get(`/getAllCmt/${param}`).then(res => res.data) };
//插入一条评论
export const setComment = params => { return axios.post(`/setCmt`,params).then(res => res.data) }
//插入一条评论
export const setReply = params => { return axios.post(`/setRpy`,params).then(res => res.data) }
//更改用户头像接口
export const setAvatar = params => { return axios.post(`/user/upadateAvatar`,params).then(res => res.data) }


