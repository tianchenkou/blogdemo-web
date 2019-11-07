import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from 'axios';
import qs from "qs";
import './plugins/element.js'
// import { Button, Select } from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.prototype.$http=axios;
Vue.prototype.$qs=qs;
// axios.defaults.baseURL = 'http://localhost:8081/TestForWoss';

//使用Mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

// //简单token实现，利用本地数据库
router.beforeEach((to, from, next) => { // 路由跳转前监控(保证登录状态)
  // 重登陆删除本地数据
  // if (to.path === '/login') {
  //   sessionStorage.removeItem('user')
  // }
  let user = JSON.parse(localStorage.getItem('user'))
  // 登录验证：如果本地没有储存用户且不在登录页面则跳转
  if (!user && to.path !== '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})


var vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vue