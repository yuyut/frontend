import Vue from 'vue'
import VueRouter from 'vue-router'
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
        name: 'uploadFile',
        component: () => import( '../components/uploadFile.vue'),


      },
      {
        path: '/Form/:formId/FormResultTemplate',
        //path: '/Form/51bb96ec-30e2-4697-869c-94c47b43cc14/formVersion'
        name: 'formVersion',
        component: () => import( '../components/FormResultUpolad.vue'),

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

      }
      ,{
        path: '/Server',
        name: 'Server',
        component: () => import( '../components/Server.vue'),
       
      },
      {
        path: '/server/:serverId/ServerSetting',
        name: 'ServerSetting',
        component: () => import( '../components/ServerSetting.vue'),

       
      },
      {
        path: '/CompanyList',
        name: 'CompanyList',
        component: () => import( '../components/CompanyList.vue'),
       
      },
      {
        path: '/CompanySetting',
        name: 'CompanySetting',
        component: () => import( '../components/CompanySetting.vue'),
       
      },
      {
        path: '/AccessControlDialog',
        name: 'AccessControlDialog',
        component: () => import( '../components/AccessControlDialog.vue'),
       
      },
      {
        path: '/ShareControlDialog',
        name: 'ShareControlDialog',
        component: () => import( '../components/ShareControlDialog.vue'),
       
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
