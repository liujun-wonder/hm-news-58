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

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-input', HmInput)
Vue.component('hm-navbar', HmNavBar)

import { Button, Field, Toast, Dialog } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)
Vue.use(Dialog)

axios.defaults.baseURL = 'http://localhost:3000'

axios.interceptors.response.use(function(res) {
  console.log('拦截到了res', res)
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    Toast.fail(message)
  }
  return res
})

Vue.prototype.$axios = axios

import moment from 'moment'
Vue.filter('date', function(input) {
  return moment(input).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
