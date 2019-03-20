import Vue from 'vue'
import App from './App.vue'
//import the vue router
import VueRouter from 'vue-router'
//tell vue to use the router
Vue.use(VueRouter)
Vue.config.productionTip = false

import PenTypes from './components/PenTypes'

const routes = [
	{path: '/penTypes', component: PenTypes}
]
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})
new Vue({
  render: function (h) { return h(App) },
  router
}).$mount('#app')
