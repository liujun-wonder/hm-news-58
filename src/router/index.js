import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit', component: Edit, name: 'edit' }
  ]
})

const authUrl = ['/user', '/edit']
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (authUrl.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
