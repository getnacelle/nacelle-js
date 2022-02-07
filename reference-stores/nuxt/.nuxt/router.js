import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2960643d = () => interopDefault(import('../pages/404.vue' /* webpackChunkName: "pages/404" */))
const _06f0ccb3 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _c2be915c = () => interopDefault(import('../pages/collections/_handle.vue' /* webpackChunkName: "pages/collections/_handle" */))
const _56b748c1 = () => interopDefault(import('../pages/pages/_handle.vue' /* webpackChunkName: "pages/pages/_handle" */))
const _77476ee7 = () => interopDefault(import('../pages/products/_handle.vue' /* webpackChunkName: "pages/products/_handle" */))
const _768dff97 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/404",
    component: _2960643d,
    name: "404"
  }, {
    path: "/search",
    component: _06f0ccb3,
    name: "search"
  }, {
    path: "/collections/:handle?",
    component: _c2be915c,
    name: "collections-handle"
  }, {
    path: "/pages/:handle?",
    component: _56b748c1,
    name: "pages-handle"
  }, {
    path: "/products/:handle?",
    component: _77476ee7,
    name: "products-handle"
  }, {
    path: "/",
    component: _768dff97,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
