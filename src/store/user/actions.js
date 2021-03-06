import { userService } from "../../service";
import { permissionService } from "../../service";

export const login = ({ commit }, userInfo) => {
  return new Promise((resolve, reject) => {
    userService
      .login(userInfo)
      .then(data => {
          commit("updateToken", data.principal.token);

          const newUserInfo = {
            username: data.principal.username,
            realname: data.principal.realname,
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
        reject(error);
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
