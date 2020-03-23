import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Test from '../pages/Test.vue'
import MyFollow from '../pages/MyFollow.vue'
import MyComments from '../pages/MyComments.vue'
import MyStar from '../pages/MyStar.vue'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

//全局解决NavigationDuplicated报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/user', component: User, name: 'user' },
    { path: '/edit', component: Edit, name: 'edit' },
    { path: '/test', component: Test, name: 'test' },
    { path: '/my-follow', component: MyFollow, name: 'my-follow' },
    { path: '/my-comments', component: MyComments, name: 'my-comments' },
    { path: '/my-star', component: MyStar, name: 'my-star' }
  ]
})

const authUrl = ['/user', '/edit', '/my-follow', '/my-comments', '/my-star']
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem('token')
  if (authUrl.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

export default router
