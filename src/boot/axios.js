import Vue from 'vue'
import axios from 'axios'
import { Notify } from "quasar";
import qs from "qs";
import Router from "../router/index";
import { permissionService } from "../service";

Vue.prototype.$axios = axios

// We create our own axios instance and set a custom base URL.
// Note that if we wouldn't set any config here we do not need
// a named export, as we could just `import axios from 'axios'`
const axiosInstance = axios.create({
  baseURL: process.env.API
});

axiosInstance.defaults.transformRequest = [
  function(data, headers) {
    // Do whatever you want to transform the data
    let contentType = headers["Content-Type"] || headers["content-type"];
    if (!contentType) {
      contentType = "application/json";
      headers["Content-Type"] = "application/json";
    }

    if (contentType.indexOf("multipart/form-data") >= 0) {
      return data;
    } else if (contentType.indexOf("application/x-www-form-urlencoded") >= 0) {
      return qs.stringify(data);
    }

    return JSON.stringify(data);
  }
];

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function(config) {
    if (config.permission && !permissionService.check(config.permission)) {
      throw {
        message: "403 forbidden"
      };
    }

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

function login() {
  setTimeout(() => {
    Router.push({
      path: "/login"
    });
  }, 1000);
}

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response) {
      if (error.response.status === 401) {
        Notify.create({
          message:  error.response.data.message,
          type: 'negative'
        });
        login();
      } else if (error.response.data && error.response.data.message) {
        Notify.create({
          message: error.response.data.message,
          type: 'negative'
        });
      } else {
        Notify.create({
          message: error.response.statusText || error.response.status,
          type: 'negative'
        });
      }
    } else if (error.message.indexOf("timeout") > -1) {
      Notify.create({
        message: "Network timeout",
        type: 'negative'
      });
    } else if (error.message) {
      Notify.create({
        message: error.message,
        type: 'negative'
      });
    } else {
      Notify.create({
        message: "http request error",
        type: 'negative'
      });
    }

    return Promise.reject(error);
  }
);

// for use inside Vue files through this.$axios
Vue.prototype.$axios = axiosInstance

// Here we define a named export
// that we can later use inside .js files:
export { axiosInstance }
