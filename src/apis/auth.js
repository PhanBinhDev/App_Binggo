import axios from "../axios";

const handleGetCurrentUserApi = () => {
  return axios.get("/api/v1/user/");
};

const handleAuthenticateApi = (data) => {
  return axios.post("/api/v1/user/authenticate", null, {
    params: {
      email: data.email,
    },
  });
};

const handleLogout = (data) => {
  return axios.post("api/v1/user/logout", {
    device: data.device,
  });
};

const handleVerifyApi = (data) => {
  return axios.post(
    "/api/v1/user/verify-code",
    {
      device: data.device,
    },
    {
      params: {
        email: data.email,
        code: data.code,
      },
    }
  );
};

const handleRefreshTokenApi = () => {
  return axios.post("api/v1/user/auth/refresh-token");
};

export {
  handleRefreshTokenApi,
  handleAuthenticateApi,
  handleVerifyApi,
  handleGetCurrentUserApi,
  handleLogout,
};
