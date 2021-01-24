import axios from "axios";
import store from "../store/store";
import { authType } from "../action/type";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:2000/api",
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const { status } = error.response;
    if (status == 401) {
      localStorage.clear();
      store.dispatch({ type: authType.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
