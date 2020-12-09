import Vue from 'vue'
import App from './App.vue'
import router from './router'



Vue.config.productionTip = false


// main.js
import API from 'syncobox-shared-api'
//
import vuetify from './plugins/vuetify';
import moment from 'moment';
//shared
import shared from 'syncobox-shared'
import "syncobox-shared/dist/syncobox-shared.css"

//i18n
import i18n from './i18n'
import store from './store'

import syncoboxFormio from "syncobox-formio"
import "syncobox-formio/dist/syncobox-formio.css"


//
import syncoboxsharedui from "syncobox-shared-ui";
Vue.use(syncoboxsharedui);

const apiConfig = {
    identityBaseUrl: process.env.VUE_APP_IDENTITY_BASE_URL,
    redirectBaseUrl: process.env.VUE_APP_REDIRECT_BASE_URL,
    mainBaseUrl: process.env.VUE_APP_MAIN_BASE_URL,
    bimBaseUrl: process.env.VUE_APP_BIM_BASE_URL,
    token: localStorage.getItem('oidc_access_token')
}
Vue.use(shared, { store, router, apiConfig });
Vue.use(syncoboxFormio, {store});




// //設定API伺服器網址
// API.config.token = TOKEN;
// API.config.mainBaseUrl = process.env.VUE_APP_MAIN_BASE_URL
// API.config.bimBaseUrl = process.env.VUE_APP_BIM_BASE_URL
// Vue.prototype.$API = API


new Vue({
  i18n,
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.prototype.$Config =function(e) {
  e["responseType"] = "blob";
  return e
}