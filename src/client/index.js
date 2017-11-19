import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import iView from 'iview'

Vue.use(VueRouter)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
