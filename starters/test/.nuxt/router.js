import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _59c83fed = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _afa82596 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _fdcc0be0 = () => interopDefault(import('../pages/collections/_handle.vue' /* webpackChunkName: "pages/collections/_handle" */))
const _3d3d54e9 = () => interopDefault(import('../pages/products/_handle.vue' /* webpackChunkName: "pages/products/_handle" */))
const _b5e87256 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _59c83fed,
    name: "cart"
  }, {
    path: "/search",
    component: _afa82596,
    name: "search"
  }, {
    path: "/collections/:handle?",
    component: _fdcc0be0,
    name: "collections-handle"
  }, {
    path: "/products/:handle?",
    component: _3d3d54e9,
    name: "products-handle"
  }, {
    path: "/",
    component: _b5e87256,
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
