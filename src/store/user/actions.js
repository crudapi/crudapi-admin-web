import { userService } from "../../service";
import { permissionService } from "../../service";

export const login = ({ commit }, userInfo) => {
  return new Promise((resolve, reject) => {
    userService
      .loginByJWT(userInfo)
      .then(data => {
          //console.dir(data);
          const user = data.user;
          commit("updateToken", data.token);

          const newUserInfo = {
            username: user.principal.username,
            realname: user.principal.realname || user.principal.username,
            avatar: "",
            authorities: user.principal.authorities || [],
            roles: user.principal.roles || []
          };
          commit("updateUserInfo", newUserInfo);

          let permissions = user.authorities || [];
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
