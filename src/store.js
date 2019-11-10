import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
    user:{}
  },
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, info) {
      state.Authorization = info.token;
      localStorage.setItem('Authorization', info.token);
      state.user = info.user
    },
    logout(state) {
      localStorage.removeItem('Authorization');
      localStorage.removeItem('user');
      
      state.user = null
      
      state.Authorization = null
    },
  },
  getters: {
    // user : state=> {return state.user}
    // getBlogId(state){
    //   return state.blogId;
    // }
  },
  actions: {

  }
})
