import axios from "../axios";

const handleGetGalleryApi = (category) => {
  return axios.get(`/api/v1/gallery/?category=${category}`);
};

const handleVerifyApi = (email, code) => {
  return axios.post("/api/v1/user/verify-code", null, {
    params: {
      email,
      code,
    },
  });
};

const handleRefreshTokenApi = (refreshToken) => {
  return axios.post(
    "api/user/auth/refresh-token",
    { refreshToken },
    {
      withCredentials: true,
    }
  );
};

export { handleGetGalleryApi };
