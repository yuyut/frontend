import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Enter from '../Enter.vue'
import MainLayout from '@/layouts/Main.vue'
import store from "@/store";
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Main',
    component: MainLayout,
    children: [{
        path: '/',
        name: 'Home',
        component: Home
    }, 
    {
      //path: '/FormVersion/:formVersionId/DocumentReportTemplate',
      path: '/FormVersion/DocumentReportTemplate',
      name: 'Enter',
      component: Enter
    },]
  },

  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(vuexOidcCreateRouterMiddleware(store, "oidcStore"));
export default router
