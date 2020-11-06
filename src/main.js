import Vue from 'vue'
import App from './App.vue'
import router from './router' 
Vue.config.productionTip = false


// main.js
import API from 'syncobox-shared-api'



//設定API伺服器網址
API.config.token = "";
API.config.mainBaseUrl = process.env.VUE_APP_MAIN_BASE_URL
API.config.bimBaseUrl = process.env.VUE_APP_BIM_BASE_URL
Vue.prototype.$API = API


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
