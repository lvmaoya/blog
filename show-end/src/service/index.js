/*
 * @Author: sun
 * @Date: 2022-10-18 10:09:09
 * @LastEditTime: 2022-12-12 13:56:33
 * @Description: Do not edit
 */
import { BASE_URL, TIME_OUT } from "./request/config";
import request from "./request";

const sjRequest = new request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  showLoading: true,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token
      return config;
    },
    requestInterceptorCatch: (error) => {
      return error;
    },
    responseInterceptor: (config) => {
      return config;
    },
  },
});

export default sjRequest;
