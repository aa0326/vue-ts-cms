import { IRootState } from "@/store/types";
import { Module } from "vuex";
import { ISystemState } from "./type";
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from "@/network/main/system/system";
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    };
  },
  getters: {
    getListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    getListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeUsersList(state, userList: any[]) {
      state.usersList = userList;
    },
    changeUsersCount(state, userCount: number) {
      state.usersCount = userCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList;
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount;
    },
    changeMenuList(state, MenuList: any[]) {
      state.menuList = MenuList;
    },
    changeMenuCount(state, MenuCount: number) {
      state.menuCount = MenuCount;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      //1.获取url
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;
      // switch (pageName) {
      //   case "user":
      //     pageUrl = "users/list";
      //     break;
      //   case "role":
      //     pageUrl = "role/list";
      //     break;
      // }
      //2.对页面发送网络请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      const { list, totalCount } = pageResult.data;
      //3.将数据存储到state中
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1);

      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
      //switch更灵活
      // switch (pageName) {
      //   case "user":
      //     commit(`changeUserList`, list);
      //     commit(`changeUserCount`, totalCount);
      //     break;
      //   case "role":
      //     commit(`changeRoleList`, list);
      //     commit(`changeRoleCount`, totalCount);
      //     break;
      // }
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      //1.获取pageName 和id
      //payload:{pageName:/users,id:1}
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      //2.调用删除网络请求
      await deletePageData(pageUrl);
      //3.获取最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },

    async createPageDataAction({ dispatch }, payload: any) {
      //1.创建数据的请求
      const { pageName, queryInfo } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, queryInfo);
      //2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    async editPageDataAction({ dispatch }, payload: any) {
      //1.编辑数据的请求
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      //2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  }
};
export default systemModule;
