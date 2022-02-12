import { AxiosRequestConfig, AxiosResponse } from "axios";
export interface RequesInterceptors<T = AxiosResponse> {
  RequestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  RequestInterceptorCatch?: (config: any) => any;
  ResponseInterceptor?: (config: T) => T;
  ResponseInterceptorCatch?: (config: any) => any;
}
export interface ApiRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: RequesInterceptors<T>;
  showLoading?: boolean;
}
