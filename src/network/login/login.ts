import ApiRequest from "../index";
import { IAccount, ILoginRequest } from "./type";
import { IDataType } from "../types";
enum LoginApi {
  AccountLogin = "/login",
  LoginUserInfo = "/users/",
  UserMenus = "/role/"
}
//登录
export function accountLoginRequest(account: IAccount) {
  return ApiRequest.post<IDataType<ILoginRequest>>({
    url: LoginApi.AccountLogin,
    data: account
  });
}
//用户信息
export function requestUserInfoId(id: number) {
  return ApiRequest.get<IDataType>({
    url: LoginApi.LoginUserInfo + id,
    showLoading: false
  });
}
//角色菜单
export function requestUserMenusByRoleId(id: number) {
  return ApiRequest.get<IDataType>({
    url: LoginApi.UserMenus + id + "/menu",
    showLoading: false
  });
}
