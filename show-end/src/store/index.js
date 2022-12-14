import { createStore } from "vuex";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      isListContentMounted: false,
    };
  },
  mutations: {
    listContentMounted(state) {
      state.isListContentMounted = true;
    },
    resetMounteState(state) {
      state.isListContentMounted = false;
    },
  },
  actions: {
    listContentMounted({ commit }) {
      commit("listContentMounted");
    },
    resetMounteState({ commit }) {
      commit("resetMounteState");
    },
  },
});

export default store;
