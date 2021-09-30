import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTagsInput from '@johmun/vue-tags-input';
import DatePicker from 'vue2-datepicker'
import Vuelidate from 'vuelidate'
import vClickOutside from 'v-click-outside'

import 'vue2-datepicker/index.css'
import '@/assets/style.scss'


Vue.use(DatePicker)
Vue.use(VueTagsInput)
Vue.use(Vuelidate)
Vue.use(vClickOutside)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
