import Vuex from "vuex";


export const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});
// Make sure to inject the store in the vue instance

