import axios from "axios";
import { AUTH_PATH } from "./config";
import { handleRefreshTokenApi } from "./apis/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useModal } from "./hooks/useModal";
import { ModalTypes } from "./constants";
import { updateToken } from "./redux/slice/authSlice";

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (accessToken) => {
  refreshSubscribers.forEach((callback) => callback(accessToken));
};

const AxiosInstance = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const { onOpen } = useModal();
  const dispatch = useDispatch();
  const [isSet, setIsSet] = useState(false);
  useEffect(() => {
    const reqInterceptor = (config) => {
      if (accessToken) {
        if (config.headers) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      }
      return config;
    };
    const resInterceptor = (response) => {
      return response.data;
    };
    const errInterceptor = async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        if (error.response.data.errCode === 2) {
          onOpen(ModalTypes.timeOut);
          return Promise.reject(error);
        }
        originalRequest._retry = true;
        try {
          if (isRefreshing) {
            await new Promise((resolve) => subscribeTokenRefresh(resolve));
          } else {
            isRefreshing = true;
            const response = await handleRefreshTokenApi();
            console.log("Res", response);
            originalRequest.headers.Authorization = `Bearer ${response.newAccessToken}`;
            dispatch(updateToken({ accessToken: response.newAccessToken }));
            onRefreshed(response.newAccessToken);
            return instance(originalRequest);
          }
        } catch (error) {
          onOpen(ModalTypes.timeOut);
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
          refreshSubscribers = [];
        }
      }
    };

    const interceptorReq = instance.interceptors.request.use(
      reqInterceptor,
      (error) => {
        console.log("interceptor req error", error);
      }
    );

    const interceptorRes = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    setIsSet(true);
    return () => {
      instance.interceptors.request.eject(interceptorReq);
      instance.interceptors.response.eject(interceptorRes);
    };
  }, [isSet, accessToken]);

  return isSet && children;
};

export default instance;

export { AxiosInstance };
