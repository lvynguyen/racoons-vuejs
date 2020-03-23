import user from "./modules/user";
import Vue from "vue";
import Vuex from "vuex";
import album from "./modules/album";

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: true,
  modules: {
    user,
    album
  }
});
