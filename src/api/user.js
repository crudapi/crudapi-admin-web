import { axiosInstance } from "boot/axios";

const HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded"
};

const user = {
  login: function(data) {
    return axiosInstance.post("/api/auth/login",
      data,
      {
        headers: HEADERS
      }
    );
  },
  loginByJWT: function(data) {
    return axiosInstance.post("/api/auth/jwt/login",
      data,
      {
        headers: HEADERS
      }
    );
  },
  logout: function() {
    return axiosInstance.get("/api/auth/logout",
      {
        headers: HEADERS
      }
    );
  }
};

export { user };
