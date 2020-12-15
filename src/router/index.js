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
        path: '/viewer-header',
        name: 'viewer-header',
        component: () => import( '../components/viewer-header.vue'),

      },{
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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
      {
        path: '/Project/:projectId/Photo',
        name: 'projectPhoto',
        component: () => import( '../components/projectPhoto.vue'),
        params: {projectId:null}
      }
      , {
        path: '/server',
        name: 'server',
        component: () => import( '../components/server.vue'),
       
      },
      {
        path: '/server/taiwan-webim',
        name: 'server-setting',
        component: () => import( '../components/tawan-webim.vue'),
       
      },
      {
        path: '/company-list',
        name: 'company-list',
        component: () => import( '../components/company-list.vue'),
       
      },
      {
        path: '/company-setting',
        name: 'company-setting',
        component: () => import( '../components/company-setting.vue'),
       
      },
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
