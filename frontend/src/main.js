// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
window.$ = require('jquery')
import VueAxios from 'vue-axios'
import axios from 'axios'
import Main from './components/layouts/MainLayouts.vue'
import Login from './components/layouts/LoginLayouts.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import iziToast from 'izitoast'
import { store } from './store'
import Datetime from 'vue-datetime'
// You need a specific loader for CSS files
import 'vue-datetime/dist/vue-datetime.css'
import VueFilterDateFormat from 'vue-filter-date-format'
import Print from 'vue-print-nb'
import JsonExcel from 'vue-json-excel'
import VueJwtDecode from 'vue-jwt-decode'
Vue.component('downloadExcel', JsonExcel)
Vue.use(Print)
import veeValidate from 'vee-validate'
Vue.use(VueFilterDateFormat)
Vue.use(Datetime)
Vue.use(VueAxios,axios)
Vue.use(veeValidate)
Vue.component('main-layout', Main)
Vue.component('login-layout', Login)
Vue.use(VueSweetalert2)
Vue.use(require('vue-script2'))
Vue.config.productionTip = false
Vue.prototype.$iziToast = iziToast
Vue.prototype.$auth = ''
if(localStorage.getItem("token")!=null){
  Vue.prototype.$auth = VueJwtDecode.decode(localStorage.getItem("token"))
}
Vue.prototype.$baseUrl = 'http://localhost:8000/upload/'
/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token') != null) {
    axios.defaults.headers.common['Authorization'] = 'Bearar ' + localStorage.getItem('token')
  }
  next()
})

const newApp = new Vue({
  data: { loading: false },
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  newApp.loading = true
  next()
})
router.afterEach(() => {
  //Vue.prototype.$loading = false
  setTimeout(() => newApp.loading = false ,0) // timeout for demo purposes

})
