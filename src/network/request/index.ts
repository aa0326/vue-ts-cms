import axios from "axios";
import type { AxiosInstance } from "axios";
import { RequesInterceptors, ApiRequestConfig } from "./type";
import { ElLoading } from "element-plus";
import "element-plus/es/components/loading/style/css";
const DEFAULT_LOADING = true;
class ApiRequestClass {
  instance: AxiosInstance;
  interceptors?: RequesInterceptors;
  loading?: any;
  showLoading?: boolean;
  constructor(config: ApiRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    //单个实例拦截器封装
    this.instance.interceptors.request.use(
      this.interceptors?.RequestInterceptor,
      this.interceptors?.RequestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.ResponseInterceptor,
      this.interceptors?.ResponseInterceptorCatch
    );

    //所有实例拦截器封装
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "正在请求数据....",
            background: "rgba(0,0,0,0.5)"
          });
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close();
        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~,错误信息");
        } else {
          return res.data;
        }
      },
      (err) => {
        this.loading?.close();
        if (err.response.status === 404) {
          console.log("404错误~");
        }
        return err;
      }
    );
  }

  request<T>(config: ApiRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //单个请求config的处理
      if (config.interceptors?.RequestInterceptor) {
        config = config.interceptors.RequestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.ResponseInterceptor) {
            config = config.interceptors.ResponseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "DELETE" });
  }

  patch<T>(config: ApiRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "PATCH" });
  }
}

export default ApiRequestClass;
