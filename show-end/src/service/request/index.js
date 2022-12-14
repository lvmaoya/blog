/*
 * @Author: sun
 * @Date: 2022-10-18 08:55:07
 * @LastEditTime: 2022-12-12 15:48:15
 * @Description: Do not edit
 */
import axios from "axios";
import app from "@/main";

const DEFAULT_LOADING = true;
class request {
  instance;
  interceptors;
  loading;
  showLoading;
  constructor(config) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    // 可以给每个实例配置不同得拦截器
    // this.instance.interceptors.request.use(
    //   this.interceptors.requestInterceptor,
    //   this.interceptors.requestInterceptorCatch
    // );
    // this.instance.interceptors.response.use(
    //   this.interceptors.responseInterceptor,
    //   this.interceptors.responseInterceptorCatch
    // );
    // 全局拦截
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading == true) {
          app.config.globalProperties.$loading.showLoading();
        }
        return config;
      },
      (error) => {
        return error;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        app.config.globalProperties.$loading.hideLoading();
        if (res.data.returnCode === "-1001") {
          console.log("请求失败，错误信息");
        } else {
          return res;
        }
      },
      (error) => {
        app.config.globalProperties.$loading.hideLoading();
        return error;
      }
    );
  }
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
          return error;
        });
    });
  }

  get(config) {
    // console.log(config);
    // return axios({ url: "http://localhost:3000/getDetail", method: "get" ,params:{id:4}});
    // return this.instance.get("http://localhost:3000/getDetail", { params: { id: 3 } });
    return this.request({ ...config, method: "GET" });
  }
  post(config, url) {
    return this.request({
      url: url.url,
      method: "post",
      data: config,
    });
  }
}
export default request;
