import { createStore, Store, useStore as userVuexStore } from "vuex";
import { IRootState, IStoreType } from "./types";

//模块导入
import login from "./login/login";
const store = createStore<IRootState>({
  state: {
    name: "",
    age: 18
  },
  mutations: {},
  actions: {},
  modules: {
    login
  }
});
export function setupStore() {
  store.dispatch("login/loadLocal");
}
export function useStore(): Store<IStoreType> {
  return userVuexStore();
}
export default store;
