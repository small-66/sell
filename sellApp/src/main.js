// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import IndexPage from './components/IndexPage'

Vue.config.productionTip = false
Vue.use(VueRouter)
/* eslint-disable no-new */
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/appa',
      component: IndexPage
    }
  ]
})
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
