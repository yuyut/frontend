import Vue from 'vue'
import VueRouter from 'vue-router'
import Enter from '../Enter.vue'
import formVersion from '../formVersion.vue'
import MainLayout from '@/layouts/Main.vue'
import store from "@/store";
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'Main',
    component: MainLayout,
    children: [
      {
        path: '/FormVersion/:formVersionId/DocumentReportTemplate',
        //path: '/FormVersion/DocumentReportTemplate',/FormVersion/2778a5f3-1024-4c97-9e09-892319689f6a/DocumentReportTemplate'
        name: 'Enter',
        component: Enter,
        params:{ formVersionId:null}
        //props: true

      },
      {
        path: '/Form/:formId/FormResultTemplate',
        //path: '/Form/51bb96ec-30e2-4697-869c-94c47b43cc14/formVersion'
        name: 'formVersion',
        component: formVersion,
        params:{ formId:null}
        //props: true

      },
      {
        path: '/about',
        name: 'About',
        //params: { formVersionId:'2778a5f3-1024-4c97-9e09-892319689f6a' },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/Project/:projectId/Photo',
        name: 'projectPhoto',
        component: () => import(/* webpackChunkName: "about" */ '../components/projectPhoto.vue'),
        params: {projectId:null}
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(vuexOidcCreateRouterMiddleware(store, "oidcStore"));
export default router
