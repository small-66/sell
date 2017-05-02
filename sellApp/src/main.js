// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Goods from './components/goods/goods'
import Ratings from './components/conents/Ratings'
import Seller from './components/conents/Seller'
import './common/styuls/index.styl'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)

let router = new VueRouter({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'goods'
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
