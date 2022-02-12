import { Module } from "vuex";
import router from "@/router";
import {
  accountLoginRequest,
  requestUserInfoId,
  requestUserMenusByRoleId
} from "@/network/login/login";
import localCache from "@/utils/cache";
import { IRootState } from "../types";
import { ILoginState } from "./types";
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: []
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
      state.userMenus = userMenus;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: any) {
      //1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { id, token } = loginResult.data;
      commit("changeToken", token);
      localCache.setCache("token", token);
      //2.请求用户信息
      const userInfoResult = await requestUserInfoId(id);
      console.log(userInfoResult);
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
