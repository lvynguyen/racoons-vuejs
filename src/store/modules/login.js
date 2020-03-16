import router from '../../router'

export default {
  mutations: {
    login(state, {username, password}) {
      if (username === "vyvyvy" && password === "123456") {
        localStorage.setItem('token', '123456');
        router.push({name: 'home'}) ;
      }
    }
  },
  actions: {
    onLogin({ commit }, {username, password}) {
      commit("login", {username, password});
    }
  }
};
