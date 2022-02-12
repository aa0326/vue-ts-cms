import { createStore, storeKey } from "vuex";
import { IRootState } from "./types";

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

export default store;
