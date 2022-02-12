import ApiRequestClass from "./request";
import { BASE_URL, TIME_OUT } from "./request/config";
import localCache from "@/utils/cache";
const ApiRequest = new ApiRequestClass({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    RequestInterceptor: (config) => {
      //携带token请求拦截
      const token = localCache.getCache("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    RequestInterceptorCatch: (err) => {
      return err;
    },
    ResponseInterceptor: (config) => {
      return config;
    },
    ResponseInterceptorCatch: (config) => {
      return config;
    }
  }
});

export default ApiRequest;
