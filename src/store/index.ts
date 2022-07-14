import { createStore, Store, useStore as userVuexStore } from "vuex";
import { IRootState, IStoreType } from "./types";
import { getPageListData } from "@/network/main/system/system";
//模块导入
import login from "./login/login";
import system from "./main/system/system";
import dashboardModule from "./main/analysis/dashboard";
const store = createStore<IRootState>({
  state: {
    entireDepartment: [],
    entireRole: [],
    entireMenu: []
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    }
  },
  actions: {
    async getInitialData({ commit }) {
      //1.请求部门和角色数据
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      });
      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      });
      const { list: roleList } = roleResult.data;
      //请求全部角色数据
      const menuResult = await getPageListData("/menu/list", {});
      const { list: menuList } = menuResult.data;
      //2.保存数据
      commit("changeEntireDepartment", departmentList);
      commit("changeEntireRole", roleList);
      commit("changeEntireMenu", menuList);
    }
  },
  modules: {
    login,
    system,
    dashboardModule
  }
});
export function setupStore() {
  store.dispatch("login/loadLocal");
}
export function useStore(): Store<IStoreType> {
  return userVuexStore();
}
export default store;
