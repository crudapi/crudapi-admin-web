import { userService } from "../../service";
import { permissionService } from "../../service";

export const login = ({ commit }, userInfo) => {
  return new Promise((resolve, reject) => {
    userService
      .login(userInfo)
      .then(data => {
          //session方式登录，其实不需要token，这里为了JWT登录预留，用username代替。
          //通过Token是否为空判断本地有没有登录过，方便后续处理。
          commit("updateToken", data.principal.username);

          const newUserInfo = {
            username: data.principal.username,
            realname: data.principal.realname || data.principal.username,
            avatar: "",
            authorities: data.principal.authorities || [],
            roles: data.principal.roles || []
          };
          commit("updateUserInfo", newUserInfo);

          let permissions = data.authorities || [];
          let isSuperAdmin = false;
          if (permissions.findIndex(t => t.authority === "ROLE_SUPER_ADMIN") >= 0) {
            isSuperAdmin = true;
          }

          permissionService.set({
            permissions: permissions,
            isSuperAdmin: isSuperAdmin
          });

          resolve(newUserInfo);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const logout = ({ commit }) => {
  return new Promise((resolve, reject) => {
    userService
      .logout()
      .then(() => {
        resolve();
      })
      .catch(error => {
        console.error(error);
        resolve();
      })
      .finally(() => {
        commit("updateToken", "");
        commit("updateUserInfo", {
          username: "",
          realname: "",
          avatar: "",
          authorities: [],
          roles: []
        });

        permissionService.set({
          permissions: [],
          isSuperAdmin: false
        });
      });
  });
};

export const getUserInfo = ({ commit }) => {
  return new Promise((resolve, reject) => {
    userService
      .getUserInfo()
      .then(data => {
        commit("updateUserInfo", data);
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  });
};
