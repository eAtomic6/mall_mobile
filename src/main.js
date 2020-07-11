import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import { Cell,Button,Icon,Toast,List,Swipe,SwipeItem,CountDown,Col,Row,Checkbox,Stepper } from 'vant';
import 'vant/lib/index.css'
Vue.use(Cell)
Vue.use(Button)
Vue.use(Icon)
Vue.use(Toast)
Vue.use(List)
Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(CountDown)
Vue.use(Col)
Vue.use(Row)
Vue.use(Checkbox)
Vue.use(Stepper)

require('./mock')
Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
