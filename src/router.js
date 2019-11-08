import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
  /*隐藏路由头的# 有后台时:https://router.vuejs.org/zh/guide/essentials/history-mode.html*/
  // mode : 'history',
  routes: [
    {
      path:'/',
      name:'',
      redirect: '/home/main'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path:'/home/main',
          component:() => import('./components/home.vue')
        },
        {
          path: '/home/editblog',
          name: 'editblog',
          component: () => import('./components/editblog.vue')
        },
        {
          path: '/home/manage',
          name: 'manage',
          component: () => import('./components/manage.vue')
        },
        {
          path: '/home/myblog',
          name: 'myblog',
          component: () => import('./components/myblog.vue')
        },
        // {
        //   path:'',
        //   component:() => import('./components/home.vue')
        // },
      ]
    },
    {
      path: '/blog',
      name: 'blogview',
      component: () => import('./views/blogView.vue')
    },
    {
      path: '/login',
      component: Login,
      name: '',
      hidden: true
    },
    {
      path: '/tabs',
      component: ()=>import('./components/tabs.vue'),
      name: '',
      hidden: true
    },
    {
      path: '/404',
      component: () => import('./views/404.vue'),
      name: '',
      hidden: true
    },
    //通配符，访问任何路由时，都会跳转到404 页面，但是要放在最后
    {
      path: '*',
      hidden: true,
      redirect: '/404'
    }
  ]
})
