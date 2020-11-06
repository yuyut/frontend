import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false    

import "syncobox-shared/dist/syncobox-shared.css"
import shared from "syncobox-shared"
const apiConfig = {
    identityBaseUrl: process.env.VUE_APP_IDENTITY_BASE_URL,
    redirectBaseUrl: process.env.VUE_APP_REDIRECT_BASE_URL,
    mainBaseUrl: process.env.VUE_APP_MAIN_BASE_URL,
    bimBaseUrl: process.env.VUE_APP_BIM_BASE_URL,
    token: localStorage.getItem('oidc_access_token')
}
Vue.use(shared, { store, router, apiConfig });

new Vue({
  render: h => h(App)
}).$mount('#app')
