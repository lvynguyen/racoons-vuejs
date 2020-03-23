const state = {
  albumList: []
};

const mutations = {
  setImageSrc: (state, payload) => {
    state.albumList.push(payload);
  }
};

const actions = {
  setImageSrc: ({ commit }, payload) => {
    commit("setImageSrc", payload);
  }
};

export default {
  namespaced: true,
  actions,
  state,
  mutations
};
