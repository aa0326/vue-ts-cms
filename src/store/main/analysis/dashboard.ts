import { Module } from "vuex";
import { IRootState } from "@/store/types";
import { IDashboardState } from "./type";
import {
  getCategoryGoodsSale,
  getCategoryGoodsCount,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from "@/network/analysis/dashboard";
const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsFavor: [],
      categoryGoodsSale: [],
      addressGoodsSale: []
    };
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list;
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list;
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list;
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list;
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountRes = await getCategoryGoodsCount();
      commit("changeCategoryGoodsCount", categoryCountRes.data);
      const categorySaleRes = await getCategoryGoodsSale();
      commit("changeCategoryGoodsSale", categorySaleRes.data);
      const categoryFavorRes = await getCategoryGoodsFavor();
      commit("changeCategoryGoodsFavor", categoryFavorRes.data);
      const AddressGoodsRes = await getAddressGoodsSale();
      commit("changeAddressGoodsSale", AddressGoodsRes.data);
    }
  }
};
export default dashboardModule;
