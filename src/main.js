// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import Mybread from '@/components/cuscom/mybread.vue'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/reset/reset.css'
import MyHttpServer from '@/plugins/http.js'
import moment from 'moment'
Vue.use(ElementUI)
Vue.use(MyHttpServer)

Vue.config.productionTip = false
Vue.filter('fmttime', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
Vue.component(Mybread.name, Mybread)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
