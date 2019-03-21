import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import PenTypes from '@/components/PenTypes'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/penTypes',
      name: 'PenTypes',
      component: PenTypes,
    }
  ]
})

export default router