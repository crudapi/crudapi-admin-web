import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import { authService } from "../service";
import store from "../store";

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
const Router = new VueRouter({
  scrollBehavior: () => ({ x: 0, y: 0 }),
  routes,

  // Leave these as they are and change in quasar.conf.js instead!
  // quasar.conf.js -> build -> vueRouterMode
  // quasar.conf.js -> build -> publicPath
  mode: process.env.VUE_ROUTER_MODE,
  base: process.env.VUE_ROUTER_BASE
});

const whiteList = ["/login", "/403"];

function hasPermission(router) {
  if (whiteList.indexOf(router.path) !== -1) {
    return true;
  }

  return true;
}

Router.beforeEach(async (to, from, next) => {
  let token = authService.getToken();
  if (token) {
    let userInfo = store.state.user.userInfo;
    if (!userInfo.username) {
      try {
        await store.dispatch("user/getUserInfo");
        next();
      } catch (e) {
        if (whiteList.indexOf(to.path) !== -1) {
          next();
        } else {
          next("/login");
        }
      }
    } else {
      if (hasPermission(to)) {
        next();
      } else {
        next({ path: "/403", replace: true });
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});

export default Router;
