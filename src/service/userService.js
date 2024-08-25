import { user} from "../api";
import { LocalStorage } from "quasar";

const userService = {
  login: async function(data) {
    var res = await user.login(data);
    return res.data;
  },
  logout: async function() {
    var res = await user.logout();
    return res.data;
  }, 
  menu: async function(dataSource) {
    var res = await user.menu(dataSource);
    return res.data;
  },
  table: async function(dataSource) {
    var res = await user.table(dataSource);
    return res.data;
  },
  getUserInfo: async function() {
    return LocalStorage.getItem("userInfo") || {};
  },
  setUserInfo: function(userInfo) {
    LocalStorage.set("userInfo", userInfo);
  }
};

export { userService };
