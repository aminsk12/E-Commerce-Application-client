import config from "@/config";
import { logout } from "@/services/authService";
import axios from "axios";
import { cookies } from "next/headers";

const axiosInstance = axios.create({
  baseURL: config.backendApi,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      await logout();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
