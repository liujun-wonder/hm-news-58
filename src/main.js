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
Vue.component('hm-navbar',HmNavBar)

axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

import { Button, Field, Toast } from 'vant'
Vue.use(Button)
Vue.use(Field)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
