import Vue from 'vue'
import App from './App.vue'
import './styles/base.less'
import './styles/iconfont.less'
import 'lib-flexible'
import router from './router'

import axios from 'axios'

import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo.vue'
import HmButton from './components/HmButton.vue'
import HmInput from './components/HmInput.vue'
import HmNavBar from './components/HmNavBar.vue'
import HmPost from './components/HmPost.vue'
import HmComment from './components/HmComment.vue'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-input', HmInput)
Vue.component('hm-navbar', HmNavBar)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)

import {
  Button,
  Field,
  Toast,
  Dialog,
  Radio,
  RadioGroup,
  Cell,
  CellGroup,
  Uploader,
  List,
  Tab,
  Tabs,
  PullRefresh
} from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.response.use(function(res) {
  // console.log('拦截到了res', res)
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    Toast.fail(message)
  }
  return res
})

axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

Vue.prototype.$axios = axios

import moment from 'moment'
Vue.filter('date', function(input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

Vue.filter('date2', function(input) {
  const d = new Date(input)
  const now = new Date()
  const hour = ((now - d) / 1000 / 60 / 60) | 0
  if (hour < 1) {
    return '1小时内'
  } else if (hour < 24) {
    return hour + '小时前'
  } else {
    return moment(input).format('YYYY-MM-DD HH:mm:ss')
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
