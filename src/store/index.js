import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'

import user from "./user";

import { plugin as userPlugin } from "./user";


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

const Store = new Vuex.Store({
  modules: {
    user
  },

  plugins: [userPlugin],

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEBUGGING
});

export default Store;
