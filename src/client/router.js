import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../server/views/Hello'
import Admin from '../server/views/Admin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  history: true,
  saveScrollPosition: true,
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
