import { Module } from "vuex";
import router from "@/router";
import {
  accountLoginRequest,
  requestUserInfoId,
  requestUserMenusByRoleId
} from "@/network/login/login";
import { MapMenusToRoutes, mapMenusToPermissions } from "@/utils/map-menus";
import localCache from "@/utils/cache";
import { IRootState } from "../types";
import { ILoginState } from "./types";
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permission: []
    };
  },
  getters: {},
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo;
    },
    changeUserMenus(state, userMenus) {
      //注册动态路由
      state.userMenus = userMenus;
      const routes = MapMenusToRoutes(userMenus);
      routes.forEach((route) => {
        router.addRoute("main", route);
      });
      //获取用户按钮的权限
      const permission = mapMenusToPermissions(userMenus);
      state.permission = permission;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token);

      this.dispatch("getInitialData", null, { root: true });
      //2.请求用户信息
      const userInfoResult = await requestUserInfoId(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      localCache.setCache("userInfo", userInfo);
      //3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      localCache.setCache("userMenus", userMenus);
      commit("changeUserMenus", userMenus);
      //4.跳到首页
      router.push("/main");
    },
    loadLocal({ commit }) {
      const token = localCache.getCache("token");
      const userInfo = localCache.getCache("userInfo");
      const userMenus = localCache.getCache("userMenus");
      if (token) {
        commit("changeToken", token);
        this.dispatch("getInitialData", null, { root: true });
      }
      if (userInfo) {
        commit("changeUserInfo", userInfo);
      }
      if (userMenus) {
        commit("changeUserMenus", userMenus);
      }
    }
  }
};
export default loginModule;
